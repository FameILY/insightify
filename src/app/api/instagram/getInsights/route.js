import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/db";
import User from "@/models/User";

export const fetchInsights = async (businessId, accessToken) => {
  const params = new URLSearchParams({
    metric: "reach",
    period: "day",
    metric_type: "time_series",
    since: "1704067200",
    until: "1706572800",
    access_token: accessToken,
  });

  const url = `https://graph.facebook.com/v21.0/${businessId}/insights?${params.toString()}`;

  // Define the metrics you want to fetch
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch insights");
  }
  const data = await response.json();
  return data.data; // Return the insights data
};

export async function GET(req, res) {
  const email = await req.headers.get("email");
  const Authorization = await req.headers.get("Authorization");

  if (Authorization == process.env.NEXT_PUBLIC_API_KEY && email) {
    //geting token from db
    await connectMongoDB();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    const tokenData = await user.connectedApps.get("instagram");

    if (!tokenData) {
      return NextResponse.json(
        { message: "No Token found for the user" },
        { status: 401 }
      );
    }

    const isTokenExpired = Date.now() > tokenData.expiry_date;

    //if expired
    if (isTokenExpired) {
      // show error for now
      return NextResponse.json(
        { message: "Token Expired, Login again" },
        { status: 401 }
      );
    }

    if (tokenData.access_token) {
      try {
        const data = await fetchInsights(tokenData.instagram_business_account, tokenData.access_token);
        return NextResponse.json(
          { message: "Success", data: data },
          { status: 200 }
        );
      } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    } else {
      return NextResponse.json(
        { message: "Unauthorized, no access token" },
        { status: 401 }
      );
    }
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 500 });
  }
}
