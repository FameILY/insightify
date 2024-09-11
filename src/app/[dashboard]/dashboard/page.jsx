"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const onclickhandle = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.log(error);
    }
  };
  const redirectYoutube = async () => {
    try {
      router.push("/youtube");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>

      <div className="">
        <h1 className="font-semibold text-4xl m-2">Welcome to Insightify</h1>
        {!session ? (
          <Button className="m-2" onClick={onclickhandle}>
            Signup
          </Button>
        ) : (
          <>
            <Avatar>
              <AvatarImage src={session.user.image} />
              <AvatarFallback>{session.user.name}</AvatarFallback>
            </Avatar>
            <p>Signed in as {session.user.email}</p>
            <Button className="m-2" onClick={() => signOut()}>
              Sign out
            </Button>
            <Button className="" onClick={redirectYoutube}>
              Youtube
            </Button>
          </>
        )}
      </div>
    </>
  );
}
