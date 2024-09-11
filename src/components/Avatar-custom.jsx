import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

export default function AvatarCustom() {
  const { data: session } = useSession();

  return (
    <>
      <DropdownMenu>

        <DropdownMenuTrigger asChild>
          <Button variant="outlined" size="icon">
            <Avatar>
              <AvatarImage src={session.user.image} />
              <AvatarFallback>{session.user.name}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => signOut('google')}>
          Sign out
        </DropdownMenuItem>
        <DropdownMenuItem >
          Other
        </DropdownMenuItem>
        <DropdownMenuItem >
          Other
        </DropdownMenuItem>
      </DropdownMenuContent>

      </DropdownMenu>
    </>
  );
}
