import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

async function fetchYoutubeAnalyticsData(accessToken){
  const params = new URLSearchParams({
    ids: 'channel==MINE',
    startDate: '2022-01-01',
    endDate: '2022-12-31',
    metrics: 'views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,subscribersGained',
    dimensions: 'day',
    sort: 'day'
  });

  const url = `https://youtubeanalytics.googleapis.com/v2/reports?${params.toString()}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  });

  const data = await response.json();
  return data;
} 

export async function GET(req){
  const token = await getToken({req})
  console.log("Retrieved token:", token);

  if (token?.accessToken) {
    try {
      const data = await fetchYoutubeAnalyticsData(token.accessToken);
      return NextResponse.json(data, {status: 200})
    } catch (error) {
      return new Response(error, {status: 500})

    }
  } else {
    return new Response("Unauthorized, no token", {status: 401})

  }
}