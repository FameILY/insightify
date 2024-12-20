"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import RadialChart from "@/components/Dashboard/dash/RadialChart";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import ViewAndSubLineGraph from "@/components/youtube/lineGraph"

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loginAgain, setLoginAgain] = useState(false);
  const { toast } = useToast();
  const [subs, setSubs] = new useState("");
  const [maxSubs, setMaxSubs] = new useState("");
  const [views, setViews] = new useState("");
  const [maxViews, setMaxViews] = new useState("");
  const[ dataForLine, setDataForLine ] = new useState("");
  
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [channelExist, setChannelExist] = useState(false);

  function handleRedirect() {
    try {
      router.push("/settings");
    } catch (err) {
      console.log(err);
    }
  }

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
    if (res.status === 401) {
      setLoginAgain(true);
      return
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

      setSubs(subscriberCount);
      setViews(viewCount);
      

      // Calculate maxSubs and maxViews based on the new values
      const maxsubs = automateMaxCount(subscriberCount);
      const maxviews = automateMaxCount(viewCount);
      setMaxSubs(maxsubs);
      setMaxViews(maxviews);
      setLoading(false);
    } else {
      setChannelExist(false);
    }
  };

  const fetchDataForLine = async () => {

    const res = await fetch("/api/youtube/forLine", {
      method: "GET",
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_KEY,
        email: session.user.email,
        Accept: "application/json",
      },
    });
    if (res.status === 401) {
      setLoginAgain(true);
      return
      // throw new Error("Token expired or unauthorized. Please sign in again.");
    } 

    const data = await res.json();

    
    if (res.status == 200) {
      setChannelExist(true)

      console.log(data.message);
      
      setDataForLine(data.data)
      setLoading(false);
    } else {
      setChannelExist(false)
    }

  }

  useEffect(() => {
    if (session) {
      // Ensure the session is available before fetching
      const fetchData = async () => {
        setLoading(true);
        await fetchYtStats();
        await fetchDataForLine();
        setDataLoaded(true); // Mark data as loaded once both requests finish
        setLoading(false);
      };

      fetchData();
    }
  }, [session]);

  // Handle token expiration
  useEffect(() => {
    if (loginAgain) {
      toast({
        variant: "destructive",
        title: "Oops, you need to login to YouTube again!",
        description:
          "Your token has expired. This could be due to a password change or you removed this app's permission to access your YouTube data.",
        action: (
          <ToastAction onClick={handleRedirect} altText="Login to YouTube Again">Login</ToastAction>
        ),
      });

      setLoginAgain(false)
    }
  }, [loginAgain, toast]);

  if (loading || !dataLoaded) {
    return (
      <div className="flex justify-center items-center w-full">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (!channelExist) {
    return (
      <>
      <div className="w-full flex justify-center items-center">
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
    )
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

        
      </div>
      <hr />
      <div className="charsomething my-4">
      <ViewAndSubLineGraph
      chartData={dataForLine}
      />
      </div>
      {/* <hr /> */}
      {/* <div className="charsomething flex my-4">
        <p>Recent Post Metrics here</p>
      </div> */}
    </div>
  );
}
