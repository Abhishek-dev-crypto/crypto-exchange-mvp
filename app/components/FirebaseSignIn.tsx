import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { signIn } from "next-auth/react";  // To call NextAuth's credentials provider

const FirebaseSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const auth = getAuth();
    try {
      // Firebase sign-in using email & password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Now authenticate with NextAuth
      const result = await signIn("credentials", { 
        email, 
        password 
      });

      if (result?.error) {
        setError(result.error);
      }
    } catch (err) {
      setError("Error signing in with Firebase.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign In</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default FirebaseSignIn;
