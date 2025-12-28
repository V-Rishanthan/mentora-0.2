import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/confic.js";
import { getAuthErrorMessage } from "../utils/firebaseErrors";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [selectedRole, setSelectedRole] = useState(null); // mannage the role based on the selection
  const [userProfile, setUserProfile] = useState(null);

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

  // Helper to upload Base64 to Firebase Storage
  // const uploadThumbnailToFirebase = async (base64Data, userId) => {
  //   try {
  //     if (!base64Data) return null;

  //     // 1. Create a reference in Storage
  //     const storage = getStorage();
  //     const storageRef = ref(storage, `thumbnails/${userId}.jpg`);

  //     // 2. Convert Base64 to Blob
  //     // If the string includes "data:image/jpeg;base64,", we split it
  //     const base64Image = base64Data.includes("base64,")
  //       ? base64Data.split("base64,")[1]
  //       : base64Data;

  //     const response = await fetch(`data:image/jpeg;base64,${base64Image}`);
  //     const blob = await response.blob();

  //     // 3. Upload to Firebase Storage
  //     await uploadBytes(storageRef, blob);

  //     // 4. Get the public Download URL
  //     const downloadURL = await getDownloadURL(storageRef);
  //     return downloadURL;
  //   } catch (error) {
  //     console.error("Thumbnail upload failed:", error);
  //     return null;
  //   }
  // };
  const uploadThumbnailToFirebase = async (base64Data, userId) => {
    try {
      if (!base64Data) return null;

      const storage = getStorage();
      const storageRef = ref(storage, `thumbnails/${userId}.jpg`);

      // Ensure the string has the proper Data URL prefix for Firebase to recognize it
      let finalString = base64Data;
      if (!base64Data.startsWith("data:")) {
        finalString = `data:image/jpeg;base64,${base64Data}`;
      }

      // Use 'data_url' instead of 'base64'
      // This tells Firebase to parse the "data:image/jpeg;base64,..." prefix automatically
      await uploadString(storageRef, finalString, "data_url");

      const downloadURL = await getDownloadURL(storageRef);
      console.log("Upload success! URL:", downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Thumbnail upload failed:", error);
      return null;
    }
  };

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
      const userId = response.user.uid; //  Store userId in variable

      // / --- NEW IMAGE LOGIC START ---
      let thumbnailUrl = null;
      if (teacherData.thumbnail) {
        console.log("Uploading thumbnail...");
        thumbnailUrl = await uploadThumbnailToFirebase(
          teacherData.thumbnail,
          userId
        );
      }

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
        thumbnail: thumbnailUrl,

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
