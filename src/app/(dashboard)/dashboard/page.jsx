"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function Dashboard() {
  const {data: session} = useSession()
  const router = useRouter();


  const redirectYoutube = async () => {
    try {
      router.push("/youtube");
    } catch (err) {
      console.log(err);
    }
  };

  const connectYoutube = async () => {
    try {
      router.push("/api/connect/youtube");
    } catch (err) {
      console.log(err);
    }
  
  }
  return (
    <>
      <div className="">
        <div className="flex flex-col justify-center items-center">
          <Button onClick={connectYoutube}>Connect to Youtube</Button>
        </div>
        <Button onClick={redirectYoutube}>Youtube</Button>
      </div>
    </>
  );
}
