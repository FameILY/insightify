"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import RadialChart from "@/components/Dashboard/dash/RadialChart"
export default function Dashboard() {
  const {data: session} = useSession()
  const router = useRouter();


  return (
  
      <div className="flex flex-col w-full">

        <div className="counters flex flex-row flex-wrap md:flex md:flex-wrap gap-3">
          <RadialChart
          cardTitle="Radial Chart - Text" 
          cardDescription="January - June 2024"
          unit="Subscribers"
          showing="Showing total visitors for the last 6 months"
          count={250}
          maxCount={500}
          color={'#60a5fa'}
          />  
        </div>
<hr />
        <div className="charsomething flex ">
          <p>graph of some kind here</p>

        </div>
        <hr />
        <div className="charsomething flex ">
          <p>Recent Post Metrics here</p>

        </div>

        
      </div>
    
  );
}
