import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "lib/firebaseConfig";

const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("Signed in user:", user);
  } catch (error: any) {
    console.error("Error signing in with Google:", error.message);
  }
};
