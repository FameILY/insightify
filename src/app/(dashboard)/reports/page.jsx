import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Youtube from "@/components/Dashboard/reports/Youtube";
import Image from "next/image";
function Report() {
  return (
    <div className="flex flex-col w-full">
      <Tabs defaultValue="youtube" className="">
        <TabsList>
          <TabsTrigger value="youtube">Youtube</TabsTrigger>
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
          <TabsTrigger value="twitter">X</TabsTrigger>
          <TabsTrigger value="linkedin">Linkedin</TabsTrigger>
        </TabsList>

        <TabsContent
          value="youtube"
          className="flex flex-col justify-center items-center w-full"
        >
          <Youtube />
        </TabsContent>

        <TabsContent
          value="instagram"
          className="flex flex-col justify-center items-center w-full"
        >
          Stay Tuned for Instagram Integration!
        </TabsContent>
        <TabsContent
          value="twitter"
          className="flex flex-col justify-center items-center w-full"
        >
          Stay Tuned for X Integration!
        </TabsContent>
        <TabsContent
          value="linkedin"
          className="flex flex-col justify-center items-center w-full"
        >
          Stay Tuned for linkedIn Integration!
        </TabsContent>
        <TabsContent
          value="nothing"
          className="flex flex-col justify-center items-center w-full"
        >
          <Image
            width={1000}
            height={1000}
            src={"/arrow.png"}
            alt={"something"}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Report;
