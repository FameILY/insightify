import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { refreshAccessToken } from "@/lib/ytrefresh";

async function fetchYoutubeAnalyticsData(accessToken) {
  const params = new URLSearchParams({
    ids: "channel==MINE",
    startDate: "2022-01-01",
    endDate: "2022-12-31",
    metrics:
      "views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,subscribersGained",
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
  return data;
}

function processMonthlyData(data) {
  const monthlyData = [];

  if (data.rows) {
    data.rows.forEach(row => {
      const [day, views, estimatedMinutesWatched, averageViewDuration, averageViewPercentage, subscribersGained] = row;
      const month = day.substring(0, 7); // Extract the month (YYYY-MM)

      // Find existing month entry or create a new one
      let monthEntry = monthlyData.find(entry => entry.month === month);
      if (!monthEntry) {
        monthEntry = { month, views: 0, subscribersGained: 0 };
        monthlyData.push(monthEntry);
      }

      // Aggregate the data
      monthEntry.views += Number(views);
      monthEntry.subscribersGained += Number(subscribersGained);
    });


  // Ensure monthlyData is in the format you expect
  console.log("Processed Monthly Data:", monthlyData);
  return monthlyData;
}

  console.log(monthlyData)
  return monthlyData;
}


export async function GET(req) {
  
  const email = await req.headers.get('email')
  const Authorization = await req.headers.get('Authorization')
  // console.log(Authorization)

  if ( Authorization == process.env.NEXT_PUBLIC_API_KEY || !email) {
    //geting token from db
    const client = await clientPromise;
    const db = client.db()
    const user = await db.collection("users").findOne({ email });
    // console.log("User: ",user)
    const tokenData = await user.connectedApps.youtube;
    if (!user || !tokenData) {
      throw new Error("no token found for user");
    }
  
    const isTokenExpired = Date.now() > tokenData.expiry_date;
  
    //if expired
    if (isTokenExpired) {
      try {
        console.log("token expired, refreshing...")
        const { access_token } = await refreshAccessToken(email);
        tokenData.access_token = access_token;
      } catch (err) {
        return NextResponse.json({ message: "Failed to refresh access token", error: err }, { status: 401});
      }
    }
  
    
 if (tokenData.access_token) {
  try {
    const data = await fetchYoutubeAnalyticsData(tokenData.access_token);
    const monthlyData = processMonthlyData(data);
    return NextResponse.json({ message: "Success", data: monthlyData }, { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
} else {
      return new Response("Unauthorized, no access token", { status: 401 });
    }
  } else {
    return NextResponse.json({message: 'Unauthorized'}, {status: 500})
  }

}
