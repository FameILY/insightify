import { NextResponse } from "next/server";
import { refreshAccessToken } from "@/lib/ytrefresh";
import connectMongoDB from "@/lib/db";
import User from "@/models/User";


async function fetchStats(accessToken) {
  const params = new URLSearchParams({
    part: "statistics",
    mine: "true"
  });

  const url = `https://www.googleapis.com/youtube/v3/channels?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  const data = await response.json();
  return data;
}


export async function GET(req) {
  const email = await req.headers.get("email");
  const Authorization = await req.headers.get("Authorization");

  if (Authorization == process.env.NEXT_PUBLIC_API_KEY && email) {
    //geting token from db
    await connectMongoDB();

    const user = await User.findOne({ email });

    if (!user){
      return NextResponse.json({message: "User not found"})
    }

    const tokenData = await user.connectedApps.get('youtube');

    if (!tokenData) {
      return NextResponse.json({message: "No Token found for the user"})
    }

    const isTokenExpired = Date.now() > tokenData.expiry_date;

    //if expired
    if (isTokenExpired) {
      try {
        console.log("token expired, refreshing...");
        const { access_token } = await refreshAccessToken(email);
        tokenData.access_token = access_token;
      } catch (err) {
        return NextResponse.json(
          { message: "Failed to refresh access token", error: err.message },
          { status: 401 }
        );
      }
    }
  
    
 if (tokenData.access_token) {
  try {
    const data = await fetchStats(tokenData.access_token);
    return NextResponse.json({ message: "Success", data: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({error: error.message },{ status: 500 });
  }
} else {
      return NextResponse.json({message: "Unauthorized, no access token"}, { status: 401 });
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 500 });
  }
}
