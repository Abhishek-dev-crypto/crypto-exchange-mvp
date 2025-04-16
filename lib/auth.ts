import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions, SessionStrategy } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Enter your username" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        // Replace with actual authentication logic
        if (credentials.username === "admin" && credentials.password === "password") {
          return { id: "1", name: "Admin", email: "admin@example.com" };
        }

        throw new Error("Invalid username or password");
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in your .env file
  session: {
    strategy: "jwt" as SessionStrategy, // Explicitly cast "jwt" to correct type
  },
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
    error: "/auth/error", // Custom error page
  },
  debug: process.env.NODE_ENV === "development", // Enable debugging in dev mode
};
