import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import Image from "next/image";

function Feature({ head, body, image }) {
  return (
    <Card className="max-w-96">
      <CardHeader>
        <Image 
          src={image} 
          alt={head || "Feature Image"} 
          width={500} 
          height={500} 
        />
      </CardHeader>

      <CardContent className="px-6">
        <CardTitle className="scroll-m-20 text-2xl font-bold tracking-tighter lg:text-2xl">
          {head}
        </CardTitle>

        <CardDescription className="scroll-m-20 dark:text-zinc-400 text-lg font-normal tracking-tighter mt-2">
          {body}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export default Feature;
