'use client';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

const FirebaseSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Firebase email sign-in successful");
      // Optional: Redirect or display success message here
    } catch (err) {
      setError('❌ Error signing in with Firebase.');
      console.error(err);
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
