import React from "react";

function About() {
  return (
    <>
      <div className="flex flex-row justify-center items-center min-h-64 md:px-64 px-4 ">
        <p className="scroll-m-20 dark:text-zinc-400 text-2xl font-light tracking-tighter lg:text-2xl mt-2 ">
          <span className="scroll-m-20 dark:text-zinc-50 text-2xl font-light tracking-tighter lg:text-2xl">
            All Your Social Media Insights in One Place.{" "}
          </span>
          Unlock the power of data to grow your audience. Analyze, predict, and
          optimize your social media content across YouTube, Instagram, X, and
          LinkedIn —all from one dashboard.
        </p>

      </div>
      <div className="flex flex-row justify-center p-4 mt-4 md:px-32 md:mt-0 min-h-32">

        <p className=" mt-22 scroll-m-20 dark:text-zinc-400 text-2xl font-medium tracking-tighter lg:text-2xl mt-2 ">
          <span className="scroll-m-20 dark:text-zinc-50 text-3xl font-medium tracking-tighter lg:text-3xl">
            What is Insightify?{" "}
          </span>
            Everything you need to grow your audience online.
        </p>
      </div>
    </>
  );
}

export default About;
