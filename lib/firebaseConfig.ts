// crypto-mvp/lib/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKHqrZIGMn1_oMRbHn-0rYkGT-dV24F1U",
  authDomain: "allchain-mvp.firebaseapp.com",
  projectId: "allchain-mvp",
  storageBucket: "allchain-mvp.firebasestorage.app",
  messagingSenderId: "407708201539",
  appId: "1:407708201539:web:cdae1b6ce80c67826c1af6",
  measurementId: "G-W3ERYPVTN7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
