"use client";
import Header from "@/components/Dashboard/Header";
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({ children }) {
  return (
    <>
      <Header mainContent={children}></Header>
      <Toaster />
    </>
  );
}
