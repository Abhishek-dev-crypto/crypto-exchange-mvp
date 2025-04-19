// app/auth/signin/page.tsx

'use client';

import { useEffect } from 'react';
import { auth, googleProvider } from '../../lib/firebaseConfig';

import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import GoogleSignIn from '../../home/page';  // Corrected import path

const SignInPage = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If already authenticated, redirect to trade page
        router.push("/trade");
      }
    });

    return () => unsubscribe(); // Clean up on unmount
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Sign In</h1>
      <GoogleSignIn />  {/* Display Google SignIn button */}
    </div>
  );
};

export default SignInPage;
