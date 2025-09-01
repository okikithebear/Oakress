import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCRxjI2nHKxiJbq5m80lQYAjdXYBIHKJs",
  authDomain: "oakress-6eff6.firebaseapp.com",
  projectId: "oakress-6eff6",
  storageBucket: "oakress-6eff6.firebasestorage.app",
  messagingSenderId: "893032341962",
  appId: "1:893032341962:web:7e8981c79e1abc2a69af33",
  measurementId: "G-TW1X7FRZ4K",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
