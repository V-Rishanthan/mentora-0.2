// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import {getReactNativePersistence,initializeAuth} from 'firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeR1L1Q1sy6kMYO59Avl9PCxBwfqmmNa8",
  authDomain: "mentora-22ca7.firebaseapp.com",
  projectId: "mentora-22ca7",
  storageBucket: "mentora-22ca7.firebasestorage.app",
  messagingSenderId: "121690300090",
  appId: "1:121690300090:web:5c313fdc218416dd516c83",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const userRef = collection(db, "users");
export const roomRef = collection(db, "rooms");
