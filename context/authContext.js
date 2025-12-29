import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/confic.js";
import { getAuthErrorMessage } from "../utils/firebaseErrors";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [selectedRole, setSelectedRole] = useState(null); // mannage the role based on the selection
  const [userProfile, setUserProfile] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);

  useEffect(() => {
    // onAuthStatusChanged

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("got user:", firebaseUser);
      console.log("Auth state changed:", firebaseUser?.email || "No user");
      if (firebaseUser) {
        setIsAuthenticated(true);
        setUser(firebaseUser);

        // Fetch user profile from Firestore

        try {
          const profile = await fetchUserProfile(firebaseUser.uid);
          if (profile) {
            setUserProfile(profile);
            setSelectedRole(profile.role || null);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setSelectedRole(null); // Clear role on logout
        setUserProfile(null); //Clear user profile
      }
    });
    return unsub;
  }, []);

  // Function to fetch all courses (teachers) data
  const fetchCourseData = async () => {
    try {
      setLoadingCourses(true);
      console.log("Fetching course data...");

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("role", "==", "teacher"));
      const querySnapshot = await getDocs(q);

      const courses = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        // Transform to course format with only required fields
        courses.push({
          id: userData.userId || doc.id,
          category: userData.category || "Uncategorized",
          description: userData.description || "No description available",
          subjectName: userData.subjectName || "Untitled Subject",
          subjects: userData.subjects || [],
          thumbnail: userData.thumbnail ? { uri: userData.thumbnail } : null,

          // thumbnail: userData.thumbnail
          //   ? { uri: `data:image/png;base64,${userData.thumbnail}` }
          //   : null,

          // thumbnail: userData.thumbnail ? { uri: userData.thumbnail } : null,
          // Include other teacher info if needed
          instructor: userData.username || "Anonymous Instructor",
          rating: userData.rating || 0,
          duration: userData.duration || "0h",
          isVerified: userData.isVerified || false,
          qualification: userData.qualification || "",
          specialization: userData.specialization || "",
          yearsOfExperience: userData.yearsOfExperience || 0,
          availableForHire: userData.availableForHire || false,
          totalStudents: userData.totalStudents || 0,
          totalClasses: userData.totalClasses || 0,
        });
      });

      console.log(`Fetched ${courses.length} courses`);
      setCourseData(courses);
      return { success: true, data: courses };
    } catch (error) {
      console.error("Error fetching course data:", error);
      setCourseData([]);
      return {
        success: false,
        error: error.message || "Failed to fetch courses",
      };
    } finally {
      setLoadingCourses(false);
    }
  };

  // Function to fetch user profile
  const fetchUserProfile = async (userId) => {
    try {
      if (!userId) return null;

      console.log("Fetching profile for user:", userId);
      const userDoc = await getDoc(doc(db, "users", userId));

      if (userDoc.exists()) {
        const profileData = userDoc.data();
        console.log("User profile found:", profileData);
        setUserProfile(profileData);
        return profileData;
      } else {
        console.log("No user profile found in Firestore");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  // login
  const login = async (email, password) => {
    try {
      if (!email || !password) {
        return {
          success: false,
          error: "Please enter both email and password",
        };
      }
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(" Login successful for user:", response.user.email);

      return { success: true, message: "Login  successfully" };
    } catch (error) {
      const userFriendlyMessage = getAuthErrorMessage(error.code);
      return {
        success: false,
        error: userFriendlyMessage,
      };
    }
  };

  // logout
  const logout = async () => {
    try {
      // Sign out from Firebase Authentication
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      setUserProfile(null); // Clear profile on logout

      return { success: true, message: "Logged out successfully" };
    } catch (error) {
      console.error("Logout error:", error);
      const userFriendlyMessage = getAuthErrorMessage(error.code);
      return {
        success: false,
        error: userFriendlyMessage || "Failed to log out. Please try again.",
      };
    }
  };

  // Register the Students
  const register = async (
    username,
    email,
    password,
    role,
    gender = "",
    subject = ""
  ) => {
    try {
      // Use createUserWithEmailAndPassword for registration (NOT signInWithEmailAndPassword)

      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // return { success: true, user: response.user };
      console.log("responce.user", response?.user);

      // Create user document in Firestore
      await setDoc(doc(db, "users", response?.user?.uid), {
        username: username,
        email: email,
        gender: gender,
        subjectInterest: subject,
        role: role,
        userId: response?.user?.uid,
        createdAt: new Date().toISOString(),
      });
      return { success: true, data: response?.user };
    } catch (error) {
      console.error("Registration error:", error.code);
      const userFriendlyMessage = getAuthErrorMessage(error.code);
      return { success: false, error: userFriendlyMessage };
    }
  };

  // Register the Teacher
  const registerTeacher = async (teacherData) => {
    try {
      // Validation
      if (!teacherData.email || !teacherData.password) {
        return {
          success: false,
          error: "Email and password are required",
        };
      }

      console.log(" Starting teacher registration for:", teacherData.email);

      // 1. Create user with email and password
      const response = await createUserWithEmailAndPassword(
        auth,
        teacherData.email,
        teacherData.password
      );

      console.log("Firebase user created:", response.user.uid);

      // 2. Create teacher document in Firestore
      await setDoc(doc(db, "users", response.user.uid), {
        username: teacherData.username?.trim() || "",
        email: teacherData.email.toLowerCase().trim(),
        role: "teacher",

        // Teacher-specific fields
        qualification: teacherData.qualification?.trim() || "",
        yearsOfExperience: Number(teacherData.yearsOfExperience) || 0,
        specialization: teacherData.specialization?.trim() || "",
        bio: teacherData.bio?.trim() || "",
        subjects: Array.isArray(teacherData.subjects)
          ? teacherData.subjects
          : [],
        hourlyRate: Number(teacherData.hourlyRate) || 0,

        // subject related info
        subjectName: teacherData.subjectName?.trim() || "",
        category: teacherData.category || "",
        duration: teacherData.duration || "",
        description: teacherData?.description.trim(),
        thumbnail: teacherData?.thumbnail || "",

        // Status fields
        isVerified: false,
        rating: 0,
        totalStudents: 0,
        totalClasses: 0,
        availableForHire: true,

        // Metadata
        userId: response.user.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Update global role
      setSelectedRole("teacher");

      return {
        success: true,
        data: response.user,
        message: "Teacher registration successful",
      };
    } catch (error) {
      console.error("Registration error:", error.code, error.message);

      // Handle specific errors
      let errorMessage = getAuthErrorMessage(error.code);

      // If getAuthErrorMessage doesn't cover it
      if (!errorMessage) {
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage = "This email is already registered.";
            break;
          case "auth/invalid-email":
            errorMessage = "Please enter a valid email address.";
            break;
          case "auth/weak-password":
            errorMessage = "Password should be at least 6 characters.";
            break;
          case "auth/admin-restricted-operation":
            errorMessage =
              "Registration is temporarily unavailable. Please try again later.";
            break;
          default:
            errorMessage =
              error.message || "Registration failed. Please try again.";
        }
      }

      return {
        success: false,
        error: errorMessage,
        code: error.code,
      };
    }
  };

  //  Role management
  const setGlobalRole = (role) => {
    setSelectedRole(role);
    console.log("selectedRole :", selectedRole);
  };

  // Function to clear role
  const clearRole = () => {
    setSelectedRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        registerTeacher,
        logout,
        selectedRole,
        setGlobalRole,
        clearRole,
        userProfile,
        fetchUserProfile,
        // Course data functions
        fetchCourseData,
        courseData,
        loadingCourses,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped inside AuthContextProvider");
  }
  return value;
};
