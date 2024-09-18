"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function Youtube() {
  const [data, setData] = useState(null);
  const { data: session } = useSession();
  const [loginAgain, setLoginAgain] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    console.log("use effect ran!")
    if (loginAgain) {
      console.log("its onn!")
      toast({
        title: "Oops, you need to login to YouTube again!",
        description: "Your token has expired. This could be due to a password change or you removed this app's permission to access your YouTube data.",
        action: (
          <ToastAction altText="Login to YouTube Again">Login</ToastAction>
        ),
      });
    }
  }, [loginAgain, toast]);


  const fetchData = async () => {
    try {
      console.log(process.env.NEXT_API_KEY);
      const res = await fetch("/api/youtube", {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_API_KEY,
          email: session.user.email,
          Accept: "application/json",
        },
      });

      if (res.status === 401) {
        setLoginAgain(true);
        throw new Error("Token expired or unauthorized. Please sign in again.");
      } else {
        setLoginAgain(false);
      }

      const data = await res.json();
      toast({
        title: "Data Fetched Successfully",
        description: "The data has been fetched successfully.",
        action: (
          <ToastAction altText="OK">OK</ToastAction>
        ),
      });
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      
      <h1 className="text-5xl font-bold mb-4">YT!</h1>
      <Button onClick={fetchData}>Get data</Button>
      {/* <Button onClick={() => signOut()}>Sign Out</Button> */}
      <pre className="mt-4 overflow-auto h-96">
        {data ? JSON.stringify(data, null, 2) : "No data available"}
      </pre>
    </div>
  );
}
