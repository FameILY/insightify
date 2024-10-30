"use client";
import { useState, useEffect } from "react";

import { signIn, signOut, useSession } from "next-auth/react";

import Insights from "@/components/facebook/Insights";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

import Image from "next/image";
function Instagram() {
  const { data: session } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [loginAgain, setLoginAgain] = useState(false);
  const { toast } = useToast();
  const [accountDetails, setAccountDetails] = useState(null);

  const [error, setError] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  function handleRedirect() {
    try {
      router.push("/settings");
    } catch (err) {
      console.log(err);
    }
  }

  const fetchAccountDetails = async () => {
    try {
      // Fetch account details
      const res = await fetch("/api/instagram/instaStats", {
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
      setAccountDetails(data.data);
    } catch (err) {
      setError(err.message);
    }
  };


  
  // Call fetchYtStats only once on component mount
  useEffect(() => {
    if (session) {
      // Ensure the session is available before fetching
      const fetchData = async () => {
        setLoading(true);
        await fetchAccountDetails();
     
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
      title: "Oops, you need to login to Instagram again!",
      description:
        "Your token has expired. This could be due to a password change or you removed this app's permission to access your Instagram data.",
      action: (
        <ToastAction
          onClick={handleRedirect}
          altText="Login to Instagram Again"
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

  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <h1>Instagram Initial Tests (only for developers and testers)</h1>

      {/* Conditionally render the account details */}
      {accountDetails && (
        <div>
          <h2>Account Details</h2>
          <Image
            className="rounded-full h-20 w-20"
            src={accountDetails.profile_picture_url}
            alt="Profile"
            width={500}
            height={500}
          />
          <p>Name: {accountDetails.username}</p>
          <p>Followers: {accountDetails.followers_count}</p>
          <p>Following: {accountDetails.follows_count}</p>
          <p>Website: {accountDetails.website}</p>
          <p>Bio: {accountDetails.biography}</p>



        </div>
      )}
      {/* Conditionally render the Insights component */}
      <div className="flex h-96 w-96 overflow-y-auto">

          <Insights />
        </div>
      
      {error && <div>Error: {error}</div>}
    </div>
  );
}

export default Instagram;
