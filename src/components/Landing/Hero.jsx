"use client";
import React from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Hero = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const onclickhandle = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.log(error);
    }
  };

  const goToDash = async () => {
    try {
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex flex-col mt-4 p-4 md:flex-row md:items-center md:justify-between md:px-32 min-h-96 ">
        <div className="flex flex-col">
          <div className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-7xl">
            Insightify
          </div>
          <div className="flex flex-row">
            <p className="scroll-m-20 text-3xl font-light tracking-tighter lg:text-2xl mt-2">
              All Your Social Media Insights in One Place.
            </p>
          
          </div>
    

          {!session ? (
            <>
              <Button className="mt-4" onClick={onclickhandle}>
                Get Started
              </Button>
            </>
          ) : (
            <>
              <Button className="mt-4" onClick={goToDash}>
                Go to Dashboard
              </Button>
            </>
          )}
        </div>

        <div className="mockup-window  dark:bg-zinc-950 border mt-6 mb-6">
          <div className="dark:bg-zinc-900 flex justify-center">
            <Image
              src="/banner.png"
              alt="hello"
              width={500}
              height={500}
            ></Image>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
