'use client';

import { useState } from 'react';
import { auth, googleProvider } from '../../lib/firebaseConfig'; // Adjust import if needed
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const GoogleSignIn = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      // Sign in with Google using a popup
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("✅ Google sign-in successful", user);

      // Redirect to the trade page after successful sign-in
      router.push("/trade");
    } catch (err) {
      setError('❌ Error signing in with Google.');
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={handleGoogleSignIn}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded"
      >
        Sign in with Google
      </button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default GoogleSignIn;
