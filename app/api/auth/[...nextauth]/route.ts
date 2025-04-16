import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { getAuth } from "firebase-admin/auth";  // Firebase Admin SDK

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        try {
          const userRecord = await getAuth().getUserByEmail(credentials.email);

          return {
            id: userRecord.uid,
            name: userRecord.displayName ?? "",
            email: userRecord.email,
          };
        } catch (error) {
          throw new Error("Invalid credentials.");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name ?? "";
        token.email = user.email ?? "";
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          name: token.name,
          email: token.email,
        },
      };
    },
    async redirect({ url, baseUrl }) {
      // If a callbackUrl is passed and it's same-origin, allow it
      if (url.startsWith(baseUrl)) return url;
      // Otherwise, always redirect to /trade after login
      return `${baseUrl}/trade`;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
