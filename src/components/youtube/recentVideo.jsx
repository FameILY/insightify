"use client";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function RecentVideo({
  src,
  title,
  views,
  likes,
  dislikes,
  favorites,
  comments,
}) {
  return (
    <Card className="lg:flex shadow-xl">
      <CardHeader>
      <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
      Recent Post Metrics
    </h2>
        <Image src={src} alt="thumbnail" width={500} height={500} />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
      <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
      {title}
    </h2>
        <div className="stats stats-vertical lg:stats-horizontal shadow">

          <div className="stat dark:bg-zinc-900 bg-zinc-100">
            <div className="stat-title ">Views</div>
            <div className="stat-value">{views}</div>
            {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
          </div>
          <div className="stat dark:bg-zinc-900 bg-zinc-100">
            <div className="stat-title">Likes</div>
            <div className="stat-value">{likes}</div>
            {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
          </div>

          <div className="stat dark:bg-zinc-900 bg-zinc-100">
            <div className="stat-title">Dislikes</div>
            <div className="stat-value">{dislikes}</div>
            {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
          </div>

          <div className="stat dark:bg-zinc-900 bg-zinc-100">
            <div className="stat-title">Favourites</div>
            <div className="stat-value">{favorites}</div>
            {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
          </div>

          
          <div className="stat dark:bg-zinc-900 bg-zinc-100">
            <div className="stat-title">Comments</div>
            <div className="stat-value">{comments}</div>
            {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
          </div>
        </div>
        {/* <h2 className="text-xl font-bold">{title}</h2> */}
        {/* <p>{`Views: ${views} | Likes: ${likes} | Dislikes: ${dislikes} | Favorites: ${favorites} | Comments: ${comments}`}</p> */}
      </CardContent>
      <CardFooter>
        {/* <Button className="">Something</Button> */}
      </CardFooter>
    </Card>
  );
}

export default RecentVideo;
