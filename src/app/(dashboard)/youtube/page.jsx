"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function Youtube() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/youtube');
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
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
