'use client';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useRouter } from 'next/router';

const FirebaseSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();
    setLoading(true); // Set loading to true on form submission

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Firebase email sign-in successful");
      router.push("/trade");  // Redirect to the trade page after successful sign-in
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setError('❌ No user found with this email.');
      } else if (err.code === 'auth/wrong-password') {
        setError('❌ Incorrect password.');
      } else {
        setError('❌ Error signing in with Firebase.');
      }
      console.error(err);
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-sm mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded"
        disabled={loading}  // Disable the button while loading
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </form>
  );
};

export default FirebaseSignIn;
