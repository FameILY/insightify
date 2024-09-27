"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import YouTubeAnalyticsChart from '@/components/youtube/charts';

export default function Youtube() {
  const [monthlyData, setMonthlyData] = useState(0);
  const [data, setData] = useState(null);
  const { data: session } = useSession();
  const [loginAgain, setLoginAgain] = useState(false);
  const { toast } = useToast();
  const [apps, setApps] = useState({});
  const [loading, setLoading] = useState(true);
  const [appsFetched, setAppsFetched] = useState(false); // Separate loading state for apps
  const router = useRouter();

  function handleRedirect() {
    try {
      router.push("/settings");
    } catch (err) {
      console.log(err);
    }
  }

  // First useEffect: Fetch connected apps
  useEffect(() => {
    async function getApps() {
      if (session?.user.email) {
        try {
          const res = await fetch("/api/checkConnectedApps", {
            headers: {
              email: session?.user.email,
            },
          });
          const data = await res.json();
          setApps(data.connectedApps);
        } catch (error) {
          console.error("Error fetching connected apps:", error);
        } finally {
          setAppsFetched(true); // Set appsFetched to true after apps are fetched
          setLoading(false); // General loading flag
        }
      }
    }
    getApps();
  }, [session?.user.email]);

  // Second useEffect: Check if user needs to log in to YouTube
  useEffect(() => {
    if (appsFetched && apps?.youtube === undefined) {
      toast({
        title: "Login to YouTube here",
        description: "It's necessary to log in to see your analytics.",
        action: (
          <ToastAction altText="Login to YouTube" onClick={handleRedirect}>
            Login
          </ToastAction>
        ),
      });
    }
  }, [appsFetched, apps, toast]);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  const fetchData = async () => {
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
      const formattedMonthlyData = Object.entries(data.data).map(([month, metrics]) => ({
        month,
        views: metrics.views,
        subscribersGained: metrics.subscribersGained,
      }));
      setMonthlyData(formattedMonthlyData);
      toast({

        title: "Data Fetched Successfully",
        description: "The data has been fetched successfully.",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col w-full">
       <h1 className="text-5xl font-bold mb-4">YouTube Analytics</h1>
      <Button onClick={fetchData}>Get Data</Button>
      <YouTubeAnalyticsChart monthlyData={monthlyData} />
    </div>
  );
}
