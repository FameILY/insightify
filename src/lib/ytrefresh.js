import { google } from "googleapis";
import clientPromise from "@/lib/db";

// Refresh the access token using the refresh token
export async function refreshAccessToken(email) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.AUTH_GOOGLE_ID,
    process.env.AUTH_GOOGLE_SECRET,
    `${process.env.NEXTAUTH_URL}/api/connect/ytcallback`
  );

  // Ensure that the MongoDB client is connected
  const client = await clientPromise;
  const db = client.db();

  // Find the user by email
  const user = await db.collection("users").findOne({ email });
  if (!user) {
    throw new Error("No user found");
  }

  // Check if YouTube refresh token exists
  const youtubeConnection = user.connectedApps?.youtube;
  if (!youtubeConnection?.refresh_token) {
    throw new Error("No YouTube refresh token found");
  }

  // Set the OAuth2 credentials using the refresh token
  oauth2Client.setCredentials({
    refresh_token: youtubeConnection.refresh_token,
  });

  try {
    // Refresh the access token
    const { credentials } = await oauth2Client.refreshAccessToken();
    const { access_token, expiry_date } = credentials;

    // Update the user's access token and expiry date in the database
    await db.collection("users").updateOne(
      { email },
      {
        $set: {
          "connectedApps.youtube.access_token": access_token,
          "connectedApps.youtube.expiry_date": expiry_date,
        },
      }
    );

    return { access_token, expiry_date };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw new Error("Failed to refresh access token");
  }
}
