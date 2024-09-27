"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import RadialChart from "@/components/Dashboard/dash/RadialChart";
import { useState, useEffect } from "react";

export default function Youtube() {
  const { data: session } = useSession();
  const router = useRouter();
  const [subs, setSubs] = new useState("");
  const [maxSubs, setMaxSubs] = new useState("");
  const [views, setViews] = new useState("");
  const [maxViews, setMaxViews] = new useState("");
  const [videoCount, setVideoCount] = new useState("");
  const [maxVideoCount, setMaxVideoCount] = new useState("");
  const [loading, setLoading] = useState(true);


  let maxCount;

  const automateMaxCount = (count) => {
    if (count < 100) {
      maxCount = count + 50; // If count is less than 100, add 50
    } else if (count < 1000) {
      maxCount = Math.round(count * 1.5); // Scale up by 50%
    } else {
      maxCount = Math.round(count * 1.2); // Scale up by 20%
    }

    return maxCount;
  };

  const fetchYtStats = async () => {
    const res = await fetch("/api/youtube/channelStats", {
      method: "GET",
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_KEY,
        email: session.user.email,
        Accept: "application/json",
      },
    });

    const data = await res.json();

    if (data.message) {
      console.log(data.message);
      // Update subs and views
    const subscriberCount = parseInt(data.data.items[0].statistics.subscriberCount, 10);
    const viewCount = parseInt(data.data.items[0].statistics.viewCount, 10);
    const videoCount = parseInt(data.data.items[0].statistics.videoCount, 10);

    
    setSubs(subscriberCount);
    setViews(viewCount);
    setVideoCount(videoCount);

    // Calculate maxSubs and maxViews based on the new values
    const maxsubs = automateMaxCount(subscriberCount);
    const maxviews = automateMaxCount(viewCount);
    const maxvideocount = automateMaxCount(videoCount);


    setMaxSubs(maxsubs);
    setMaxViews(maxviews);
    setMaxVideoCount(maxvideocount);
    setLoading(false)
    }
  };

  // Call fetchYtStats only once on component mount
  useEffect(() => {
    if (session) { // Ensure the session is available before fetching
      fetchYtStats();
    }
  }, [session]); // Only run when the session changes
  
  if (loading) {
    return (
      <div className="flex justify-center items-center w-full">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full">
      <div className="counters flex flex-row flex-wrap md:flex md:flex-wrap justify-center gap-3 mb-4">
        <RadialChart
          cardTitle="Subscribers"
          cardDescription="Youtube"
          unit="Subscribers"
          showing="Showing total youtube subscribers"
          count={subs}
          maxCount={maxSubs}
          color={"#bef264"}
        />

        <RadialChart
          cardTitle="Total Views"
          cardDescription="Youtube"
          unit="Views"
          showing="Showing total youtube views"
          count={views}
          maxCount={maxViews}
          color={"#dc2626"}
        />

<RadialChart
          cardTitle="Videos"
          cardDescription="Youtube"
          unit="Videos"
          showing="Showing total youtube videos"
          count={videoCount}
          maxCount={maxVideoCount}
          color={"#dc2626"}
        />
      </div>
      <hr />
      <div className="charsomething flex my-4">
        <p>graph of some kind here</p>
      </div>
      <hr />
      <div className="charsomething flex my-4">
        <p>Recent Post Metrics here</p>
      </div>
    </div>
  );
}