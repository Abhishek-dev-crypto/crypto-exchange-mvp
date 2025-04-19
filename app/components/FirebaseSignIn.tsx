'use client';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { signIn } from 'next-auth/react'; // NextAuth credentials provider

const FirebaseSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      // 🔐 Firebase sign-in
      await signInWithEmailAndPassword(auth, email, password);

      // 🔁 Sync with NextAuth
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false, // disable automatic redirect
      });

      if (result?.error) {
        setError(result.error);
      }
    } catch {
      setError('Error signing in with Firebase.');
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
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        Sign In
      </button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </form>
  );
};

export default FirebaseSignIn;
