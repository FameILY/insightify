// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoClient } from "mongodb"; // Import MongoDB

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          scope: "openid email profile"
        }
      }
    })  
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
    async signIn({user, account}){
      try {
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        if (client) {
          console.log("connected")
        }
        const db = client.db();
        const collection = db.collection("users");

        // Check if user exists
        const existingUser = await collection.findOne({ email: user.email });

        // If user doesn't exist, add them to the database
        if (!existingUser) {
          await collection.insertOne({
            email: user.email,
            name: user.name,
            image: user.image,
            createdAt: new Date(),
            connectedApps: {} // Initially no apps connected
          });
        }
        await client.close();
      } catch (error) {
        console.error("Error inserting user into MongoDB", error);
      }
      return true;
    
    }
  }
};

// Directly export NextAuth as the default export (no need for GET and POST manually)
const handler = NextAuth(options);

export { handler as GET, handler as POST };
