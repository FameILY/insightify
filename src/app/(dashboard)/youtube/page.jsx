"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Youtube() {
  const [data, setData] = useState(null);
  const { data: session } = useSession();
  

  const fetchData = async () => {
    try {
      console.log(process.env.NEXT_API_KEY)
      const res = await fetch('/api/youtube', {
        headers: {
          'Authorization': process.env.NEXT_PUBLIC_API_KEY,
          'email': session.user.email,
          'Accept': 'application/json'
        }
      });
      const data = await res.json();
      alert(data.message)
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
      <pre className="mt-4 overflow-auto h-96">{data ? JSON.stringify(data, null, 2) : 'No data available'}</pre>
    </div>
  );
}
