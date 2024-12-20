"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import RadialChart from "@/components/Dashboard/dash/RadialChart";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import YouTubeAnalyticsChart from "@/components/youtube/charts";
import RecentVideo from "@/components/youtube/recentVideo";

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
  const [loginAgain, setLoginAgain] = useState(false);
  const { toast } = useToast();
  const [monthlyYtData, setMonthlyYtData] = useState(0);
  const [latestVideo, setLatestVideo] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [channelExist, setChannelExist] = useState(false);
  const [noVideoYet, setNoVideoYet] = useState(false);

  let maxCount;

  function handleRedirect() {
    try {
      router.push("/settings");
    } catch (err) {
      console.log(err);
    }
  }

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
    if (res.status === 401) {
      setLoginAgain(true);
      return;
      // throw new Error("Token expired or unauthorized. Please sign in again.");
    }

    const data = await res.json();

    if (data.message && data.data.items) {
      setChannelExist(true);

      console.log(data.message);
      // Update subs and views
      const subscriberCount = parseInt(
        data.data.items[0].statistics.subscriberCount,
        10
      );
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
      setLoading(false);
    } else {
      setChannelExist(false);
    }
  };

  const fetchSubsChart = async () => {
    try {
      const res = await fetch("/api/youtube", {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_API_KEY,
          email: session.user.email,
          Accept: "application/json",
        },
      });

      if (res.status === 401) {
        setLoginAgain(true);
        // throw new Error("Token expired or unauthorized. Please sign in again.");
      }

      const data = await res.json();

      if (data.data.length > 0) {
        setChannelExist(true);
        console.log("EXISTS");
        const formattedMonthlyData = Object.entries(data.data).map(
          ([month, metrics]) => ({
            month,
            views: metrics.views,
            subscribersGained: metrics.subscribersGained,
          })
        );
        setMonthlyYtData(formattedMonthlyData);
        // toast({

        //   title: "Data Fetched Successfully",
        //   description: "The data has been fetched successfully.",
        //   action: <ToastAction altText="OK">OK</ToastAction>,
        // });
      } else {
        setChannelExist(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLatestVideoMetrics = async () => {
    try {
      const res = await fetch("/api/youtube/latestVideo", {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_API_KEY,
          email: session.user.email,
          Accept: "application/json",
        },
      });

      if (res.status === 401) {
        setLoginAgain(true);
        // throw new Error("Token expired or unauthorized. Please sign in again.");
      }

      const data = await res.json();
      console.log("DATAAAAAAAAA:", data);
      if (data.data) {
        setChannelExist(true);

        setLatestVideo(data);
        // console.log("HEYYY")
        // console.log(latestVideo.data.snippet.title)
        // console.log(latestVideo.data.statistics.viewCount)

        // toast({

        //   title: "Data Fetched Successfully",
        //   description: "The data has been fetched successfully.",
        //   action: <ToastAction altText="OK">OK</ToastAction>,
        // });
      } else {
        setNoVideoYet(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Call fetchYtStats only once on component mount
  useEffect(() => {
    if (session) {
      // Ensure the session is available before fetching
      const fetchData = async () => {
        setLoading(true);
        await fetchYtStats();
        await fetchSubsChart();
        await fetchLatestVideoMetrics();
        setDataLoaded(true); // Mark data as loaded once both requests finish
        setLoading(false);
      };

      fetchData();
    }
  }, [session]); // Only run when the session changes

  // Handle token expiration
  useEffect(() => {
    if (loginAgain) {
      toast({
        variant: "destructive",
        title: "Oops, you need to login to YouTube again!",
        description:
          "Your token has expired. This could be due to a password change or you removed this app's permission to access your YouTube data.",
        action: (
          <ToastAction
            onClick={handleRedirect}
            altText="Login to YouTube Again"
          >
            Login
          </ToastAction>
        ),
      });

      setLoginAgain(false);
    }
  }, [loginAgain, toast]);

  if (loading || !dataLoaded) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (!channelExist) {
    return (
      <>
        <div className="flex flex-col w-full relative">
          <div className="counters flex flex-row flex-wrap md:flex md:flex-wrap justify-center gap-3 mb-4">
            <div className="skeleton h-32 w-32"></div>

            <div className="skeleton h-32 w-32"></div>

            <div className="skeleton h-32 w-32"></div>
          </div>
          <hr />
          <div className="charsomething flex flex-col my-4 justify-center">
            <div className="flex w-full flex-col gap-4">
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          </div>
          <hr />
          <div className="charsomething flex my-4">
            <div className="flex w-full flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-4 w-20"></div>
                  <div className="skeleton h-4 w-28"></div>
                </div>
              </div>
              <div className="skeleton h-32 w-full"></div>
            </div>
          </div>
        </div>
        <div className="absolute w-4/5 flex justify-center items-center">
          <div className="hero min-h-screen">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold">
                  You dont have a channel yet!
                </h1>
                <p className="py-6">
                  You can logout and login with a account with a channel
                  associated here!
                </p>
                <a href="/settings"><Button className="">Login with Another Channel</Button></a>
              </div>
            </div>
          </div>
        </div>
      </>
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
      <div className="charsomething flex flex-col my-4 justify-center">
        {/* <p>Subscribers and Views in the year: </p> */}
        <YouTubeAnalyticsChart monthlyData={monthlyYtData} />
      </div>
      <hr />
      <div className="charsomething flex my-4">
        {noVideoYet ? (
          <>
           <div className="flex w-full flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-4 w-20"></div>
                  <div className="skeleton h-4 w-28"></div>
                </div>
              </div>
              <div className="skeleton h-32 w-full"></div>
            </div>
          
          </>
        ) : (
          <>
            <RecentVideo
              src={latestVideo.data.snippet.thumbnails.maxres.url}
              title={latestVideo.data.snippet.title}
              views={latestVideo.data.statistics.viewCount}
              likes={latestVideo.data.statistics.likeCount}
              dislikes={latestVideo.data.statistics.dislikeCount}
              favorites={latestVideo.data.statistics.favoriteCount}
              comments={latestVideo.data.statistics.commentCount}
            />
          </>
        )}
      </div>
    </div>
  );
}
