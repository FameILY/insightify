import { google } from "googleapis";
import connectMongoDB from "./db";
import User from "@/models/User";
// Refresh the access token using the refresh token
export async function refreshAccessToken(email) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.AUTH_GOOGLE_ID,
    process.env.AUTH_GOOGLE_SECRET,
    `${process.env.NEXTAUTH_URL}/api/connect/ytcallback`
  );

  await connectMongoDB();

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("No user found");
  }

  // Check if YouTube refresh token exists
  const youtubeConnection = user.connectedApps.get('youtube');
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
    await User.updateOne(
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
    // console.log("Error refreshing access token:", error);

    // Handle specific OAuth errors
    if (error.response?.data?.error === "invalid_grant") {
      // The refresh token is invalid (e.g., revoked or expired)
      // You can return a special status or flag to prompt the user to re-login
      throw new Error("Refresh token is invalid");
    }

    // Handle other OAuth errors
    throw new Error("Failed to refresh access token");
  }
}
