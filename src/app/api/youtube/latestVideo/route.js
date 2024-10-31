import { NextResponse } from "next/server";
import { refreshAccessToken } from "@/lib/ytrefresh";
import connectMongoDB from "@/lib/db";
import User from "@/models/User";

async function fetchUploadsId(accessToken) {
  const params = new URLSearchParams({
    part: "contentDetails",
    mine: "true",
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
  // console.log("CHECKKKKK", data);
  let uploadsPlaylistId;
  if (data.items && data.items.length > 0) {
    uploadsPlaylistId =
      data.items[0]?.contentDetails?.relatedPlaylists?.uploads;
    // console.log(uploadsPlaylistId);
  } else {
    uploadsPlaylistId = null
    console.log("Items not found in response data");
  }

  //fetching latest video
  if (uploadsPlaylistId) {
    const latestVideoId = await fetchLatestVideo(uploadsPlaylistId, accessToken);
    const videoDetails = await fetchVideoStats(latestVideoId, accessToken);
    return videoDetails;
  } else {
    return null
  }
}

async function fetchLatestVideo(uploadsId, accessToken) {
  const params = new URLSearchParams({
    part: "contentDetails",
    playlistId: uploadsId,
  });

  const url = `https://www.googleapis.com/youtube/v3/playlistItems?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  const videos = await response.json();
  //   console.log(videos.items[0].contentDetails.videoId);

  const latestVideoId = await videos.items[0].contentDetails.videoId;
  return latestVideoId;
}

async function fetchVideoStats(videoId, accessToken) {
  const params = new URLSearchParams({
    part: "snippet,statistics",
    id: videoId,
  });

  const url = `https://www.googleapis.com/youtube/v3/videos?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  const video = await response.json();
  //   console.log(video.items[0]);

  const videoDetails = await video.items[0];
  return videoDetails;
}

export async function GET(req) {
  try {
    const email = await req.headers.get("email");
    const Authorization = await req.headers.get("Authorization");

    if (Authorization == process.env.NEXT_PUBLIC_API_KEY && email) {
      //geting token from db
      await connectMongoDB();

      const user = await User.findOne({ email });

      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 401 }
        );
      }

      const tokenData = await user.connectedApps.get("youtube");

      if (!tokenData) {
        return NextResponse.json(
          { message: "No Token found for the user" },
          { status: 401 }
        );
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
          const data = await fetchUploadsId(tokenData.access_token);
          if (data){
            return NextResponse.json(
              { message: "Success", data: data },
              { status: 200 }
            );
          } else {
            return NextResponse.json(
              { message: "Couldnt get the latest video for the account", data: data },
              { status: 500 }
            );
          }
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
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
