import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "lib/firebaseConfig";

// Make sure this function is used somewhere — e.g., on a button click
export const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("Signed in user:", user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error signing in with Google:", error.message);
    } else {
      console.error("Unknown error during Google sign-in:", error);
    }
  }
};
