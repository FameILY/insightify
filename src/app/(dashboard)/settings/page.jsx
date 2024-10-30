"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaYoutube, FaInstagram } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Settings() {
  const { data: session } = useSession();
  const [apps, setApps] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleLogout = async (account) => {
    if (session?.user.email) {
      const userEmail = session?.user.email;

      if (account == "youtube") {
        console.log("Logout function: ", account);
        const res = await fetch(`/api/connect/youtubeLogout/${userEmail}`, {
          method: "POST",
          headers: {
            Authorization: process.env.NEXT_PUBLIC_API_KEY,
          },
        });
        // console.log(await res.json());
        await window.location.reload()
      }
      if (account == "instagram") {
        const res = await fetch(`/api/connect/instagramLogout/${userEmail}`, {
          method: "POST",
          headers: {
            Authorization: process.env.NEXT_PUBLIC_API_KEY,
          },
        });
        await window.location.reload()
      }

    }
  };

  const handleConnect = async (account) => {
    if (account == "youtube") {
      console.log(account);
      try {
        router.push("/api/connect/youtube");
      } catch (err) {
        console.log(err);
      }
    }

    if (account == "instagram") {
      try {
        router.push("/api/connect/instagram");
      } catch (err) {
        console.log(err);
      }
    }
  };

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
          setLoading(false); // Set loading to false after fetch is complete
        }
      }
    }
    getApps();
  }, [session?.user.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col lg:w-7/12">
        <div className="my-4">
          <h1 className="text-xl font-bold">Account</h1>
          <p className="text-base text-black dark:text-zinc-400">
            Update your account settings
          </p>
        </div>
        <hr />

        <div className="my-4 flex flex-row">
          <Avatar className="w-20 h-20">
            <AvatarImage src={session?.user.image} alt="@shadcn" />
            <AvatarFallback>SB</AvatarFallback>
          </Avatar>

          <div className="flex flex-col justify-center">
            <p className="text-lg text-black dark:text-zinc-400 font-semibold ms-8">
              {session?.user.name}
            </p>
            <p className="text-base text-black dark:text-zinc-400 font-semibold ms-8">
              {session?.user.email}
            </p>
          </div>
        </div>
        <div className="my-4">
          <Label className="" htmlFor="email">
            Name
          </Label>
          <Input
            className="mt-4"
            type="email"
            name="email"
            disabled
            placeholder="Email"
            value={session?.user.name}
          />
        </div>

        <div className="my-4">
          <Label className="" htmlFor="email">
            Email
          </Label>
          <Input
            className="mt-4"
            type="email"
            name="email"
            disabled
            placeholder="Email"
            value={session?.user.email}
          />
        </div>

        <div className="my-4">
          <p className="text-xl font-bold">Connected Apps</p>
        </div>
        <hr />

        <div className="flex flex-row my-2">
          {Object.keys(apps).length > 0 ? (
            Object.keys(apps).map((app, index) => (
              <div key={index}>
                {/* {console.log("Apps: ",apps)} */}
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    {app === "youtube" && <FaYoutube className="size-7 mx-2" />}
                    {app === "instagram" && <FaInstagram className="size-7 mx-2" />}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>{app}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        handleLogout(app);
                      }}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))
          ) : (
            <>
              <div className="flex flex-col">
                <p className="mb-4">No Apps Connected</p>
              </div>
            </>
          )}
        </div>
        <hr />
        <div className="flex flex-col md:flex-row mt-4 gap-2">
          {!apps.youtube && (
            <Button onClick={() => handleConnect("youtube")}>
              <FaYoutube className="size-7" /> Connect to YouTube
            </Button>
          )}
          {!apps.instagram && (
            <Button onClick={() => handleConnect("instagram")}>
              <FaInstagram className="size-7" /> Connect to Instagram
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default Settings;
