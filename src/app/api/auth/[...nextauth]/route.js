// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from '@/models/User'
import connectMongoDB from "@/lib/db";

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      // console.log(session)
      return session;
    },
    async signIn({ user, account }) {
      try {
        await connectMongoDB()

        // Check if user exists
        const existingUser = await User.findOne({ email: user.email });

        // If user doesn't exist, add them to the database
        if (!existingUser) {
          await User.create({
            email: user.email,
            name: user.name,
            image: user.image,
            connectedApps: {}, // Initially no apps connected
          });
        }
      } catch (error) {
        console.error("Error creating user into MongoDB", error);
      }
      return true;
    },
  },
};

// Directly export NextAuth as the default export (no need for GET and POST manually)
const handler = NextAuth(options);

export { handler as GET, handler as POST };
