"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import Header from "@/components/Dashboard/Header";
export default function Dashboard() {

  // const redirectYoutube = async () => {
  //   try {
  //     router.push("/youtube");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
    <>
    {/* <Header/> */}
      <div className=""> 
        <p>test where is this</p>
            <Button className="">
              Youtube
            </Button>
       </div>
    </>
  );
}
