"use client";
import React from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/dark-mode.jsx";
import { useRouter, usePathname } from "next/navigation";

import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  Settings,
  ClipboardPlus,
  ChartColumnDecreasing,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signIn, signOut, useSession } from "next-auth/react";

function Header({ mainContent }) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const logoutHandle = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  // A helper function to determine if the link is active
  const isActiveLink = (linkPath) => pathname === linkPath;

  return (
    <>
      {/* <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"> */}
      <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[1fr] xl:grid-cols-[220px_1fr] 2xl:grid-cols-[280px_1fr]">

        <div className="hidden border-r bg-muted/40 xl:block max-h-screen">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Package2 className="h-6 w-6" />
                <span className="">Insightify</span>
              </Link>
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    isActiveLink("/dashboard")
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/analytics"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    isActiveLink("/analytics")
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <LineChart className="h-4 w-4" />
                  Analytics
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link>
                <Link
                  href="/predictions"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    isActiveLink("/predictions")
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <ChartColumnDecreasing className="h-4 w-4" />
                  Predictions
                </Link>
                <Link
                  href="/reports"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    isActiveLink("/reports")
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <ClipboardPlus className="h-4 w-4" />
                  Reports
                </Link>
                <Link
                  href="/settings"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    isActiveLink("/settings")
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </nav>
            </div>
            <div className="mt-auto p-4">
              <Card>
                <CardHeader className="p-2 pt-0 md:p-4">
                  <CardTitle>Upgrade to Pro</CardTitle>
                  <CardDescription>
                    Unlock all features and get unlimited access to our support
                    team.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                  <Button size="sm" className="w-full">
                    Upgrade
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          {/* hamburger menu code starts here */}
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 lg:block xl:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">Insightify</span>
                  </Link>
                  <Link
                    href="/dashboard"
                    className={`flex items-center gap-4 rounded-xl px-3 py-2 ${
                      isActiveLink("/dashboard")
                        ? "bg-muted text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    href="/analytics"
                    className={`flex items-center gap-4 rounded-xl px-3 py-2 ${
                      isActiveLink("/analytics")
                        ? "bg-muted text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    <LineChart className="h-4 w-4" />
                    Analytics
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      6
                    </Badge>
                  </Link>
                  <Link
                    href="/predictions"
                    className={`flex items-center gap-4 rounded-xl px-3 py-2 ${
                      isActiveLink("/predictions")
                        ? "bg-muted text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    <ChartColumnDecreasing className="h-4 w-4" />
                    Predictions
                  </Link>
                  <Link
                    href="/reports"
                    className={`flex items-center gap-4 rounded-xl px-3 py-2 ${
                      isActiveLink("/reports")
                        ? "bg-muted text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    <ClipboardPlus className="h-4 w-4" />
                    Reports
                  </Link>
                  <Link
                    href="/settings"
                    className={`flex items-center gap-4 rounded-xl px-3 py-2 ${
                      isActiveLink("/settings")
                        ? "bg-muted text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </nav>
                <div className="mt-auto">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upgrade to Pro</CardTitle>
                      <CardDescription>
                        Unlock all features and get unlimited access to our
                        support team.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button size="sm" className="w-full">
                        Upgrade
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search ..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>
            {/* navbar starts here */}
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <Avatar>
                    <AvatarImage src={session?.user.image} />
                    <AvatarFallback>{session?.user.name}</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={ ()=> router.push('/settings')}>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logoutHandle}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          {/* Main Content starts here */}

          <main className="flex flex-1 flex-col gap-4 lg:gap-6 lg:p-6 ">
            <div className="flex overflow-y-auto p-4" style={{ height: 'calc(100vh - 110px)' }}>
            {mainContent}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Header;
