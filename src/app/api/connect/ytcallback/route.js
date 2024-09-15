// pages/api/connect/youtube/callback.js
import { google } from "googleapis";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function GET(req) {
  try {
    // Extract the code from the query parameters
    const url = new URL(req.url, process.env.NEXTAUTH_URL);
    const code = url.searchParams.get("code");

    if (!code) {
      return NextResponse.json({ message: "Error: No code provided" });
    }

    // Initialize OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      process.env.AUTH_GOOGLE_ID,
      process.env.AUTH_GOOGLE_SECRET,
      `${process.env.NEXTAUTH_URL}/api/connect/ytcallback` // Ensure this matches the registered redirect URI
    );

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get the session to find the logged-in user
    const session = await getServerSession({ req });

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ message: "Error: Unable to retrieve user session" });
    }

    const email = session.user.email;
    console.log("heyyyyyyyyy")
    console.log("EMAIL: ", email)
    console.log("TOKENS: ", tokens)

    // Save the tokens in MongoDB
    try {
      const client = await MongoClient.connect(process.env.MONGODB_URI);
      const db = client.db();
      const collection = db.collection("users");

      await collection.updateOne(
        { email },
        {
          $set: {
            "connectedApps.youtube": tokens,
          },
        }
      );

      // await client.close();

      // Redirect to dashboard after successful connection
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard`);
    } catch (dbError) {
      console.error("Error saving YouTube token to MongoDB", dbError);
      return NextResponse.json({ message: "Error saving YouTube token" });
    }
  } catch (error) {
    console.error("Error during YouTube OAuth callback", error);
    return NextResponse.json({ message: "Error retrieving or saving YouTube token" });
  }
}
