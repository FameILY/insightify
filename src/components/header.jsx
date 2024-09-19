"use client";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./dark-mode";
import { signIn, signOut, useSession } from "next-auth/react";
import AvatarCustom from "./Avatar-custom";

export function Header() {
  const { data: session } = useSession();
  const onclickhandle = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-opacity-70 border-b-2 px-2 py-1 ">
        <div className="flex items-center justify-between md:px-32 ">
          <h1 className="text-2xl font-medium">Insightify</h1>

          <div className="space-x-4 flex flex-row items-center">
            <a href="#hero" class=" hover:text-gray-400">
              Home
            </a>
            <a href="#about" class=" hover:text-gray-400">
              About
            </a>

            <ModeToggle />
            {!session ? (
              <Button className="" onClick={onclickhandle}>
                Signup
              </Button>
            ) : (
              <AvatarCustom />
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
