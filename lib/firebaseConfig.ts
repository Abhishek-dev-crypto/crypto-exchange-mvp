// lib/firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';



// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKHqrZIGMn1_oMRbHn-0rYkGT-dV24F1U",
  authDomain: "allchain-mvp.firebaseapp.com",
  projectId: "allchain-mvp",
  storageBucket: "allchain-mvp.firebasestorage.app",
  messagingSenderId: "407708201539",
  appId: "1:407708201539:web:cdae1b6ce80c67826c1af6",
  measurementId: "G-W3ERYPVTN7"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize authentication and Google provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
