// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCRxjI2nHKxiJbq5m80lQYAjdXYBIHKJs",
  authDomain: "oakress-6eff6.firebaseapp.com",
  projectId: "oakress-6eff6",
  storageBucket: "oakress-6eff6.firebasestorage.app",
  messagingSenderId: "893032341962",
  appId: "1:893032341962:web:7e8981c79e1abc2a69af33",
  measurementId: "G-TW1X7FRZ4K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;
