"use client";
import Header from "@/components/Dashboard/Header";

export default function RootLayout({ children }) {
  return (
    <>
      <Header mainContent={children}></Header>
    </>
  );
}
