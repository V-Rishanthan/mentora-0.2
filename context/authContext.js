import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/confic.js";
import { getAuthErrorMessage } from "../utils/firebaseErrors";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [selectedRole, setSelectedRole] = useState(null); // mannage the role based on the selection

  useEffect(() => {
    // onAuthStatusChanged

    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("got user:", firebaseUser);
      console.log("Auth state changed:", firebaseUser?.email || "No user");
      if (firebaseUser) {
        setIsAuthenticated(true);
        setUser(firebaseUser);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setSelectedRole(null); // Clear role on logout
      }
    });
    return unsub;
  }, []);

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
        logout,
        selectedRole,
        setGlobalRole,
        clearRole,
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
