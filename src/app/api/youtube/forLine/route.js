import { NextResponse } from "next/server";
import { refreshAccessToken } from "@/lib/ytrefresh";
import connectMongoDB from "@/lib/db";
import User from "@/models/User";


async function fetchYoutubeAnalyticsData(accessToken) {
  const params = new URLSearchParams({
    ids: "channel==MINE",
    startDate: "2022-01-01",
    endDate: "2022-01-31",
    metrics:
      "averageViewDuration,averageViewPercentage",
    dimensions: "day",
    sort: "day",
  });

  const url = `https://youtubeanalytics.googleapis.com/v2/reports?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  const data = await response.json();
  return data.rows;
}


function transformData(data) {
    return data.map(item => ({
      date: item[0],
      "averageViewDuration": item[1],
      "averageViewPercentage": item[2]
    }));
}



export async function GET(req) {
  const email = await req.headers.get("email");
  const Authorization = await req.headers.get("Authorization");
  // console.log(Authorization)

  if (Authorization == process.env.NEXT_PUBLIC_API_KEY && email) {
    //geting token from db
    await connectMongoDB();

    const user = await User.findOne({ email });
    // console.log("User: ",user)
    const tokenData = await user.connectedApps.get('youtube');
    // console.log("Token Data For Youtube", tokenData)
    if (!user || !tokenData) {
      throw new Error("no token found for user");
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
    const data = await fetchYoutubeAnalyticsData(tokenData.access_token);

    const formattedData = transformData(data)
    
    return NextResponse.json({ message: "Success", data: formattedData }, { status: 200 });
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
