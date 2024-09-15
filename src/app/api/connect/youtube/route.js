// app/api/connect/youtube/route.js
import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.AUTH_GOOGLE_ID,
    process.env.AUTH_GOOGLE_SECRET,
    `${process.env.NEXTAUTH_URL}/api/connect/ytcallback`
  );
  

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/youtube.readonly",
    redirect_uri: `${process.env.NEXTAUTH_URL}/api/connect/ytcallback`
  });

  return NextResponse.redirect(authUrl);
}
