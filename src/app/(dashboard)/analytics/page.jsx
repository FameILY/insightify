"use client";
import React from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";
import { useState } from "react";

import Youtube from "@/components/Dashboard/analytics/Youtube";
import Instagram from "@/components/Dashboard/analytics/Instagram";
function Analytics() {
  const [selectedApp, setSelectedApp] = useState("");

  return (
    <div className="flex flex-col w-full">
      <div className="flex relative flex-col-reverse  gap-4 md:flex-row md:justify-between w-full">
        <div className="main-content flex flex-col w-full">
          {selectedApp === "youtube" ? (
            <div className="flex p-4">
              <Youtube/>
            </div>
          ) : selectedApp === "instagram" ? (
            <Instagram/>
          ) : selectedApp === "x" ? (
            <div>Stay Tuned for X Integration</div>
          ) : (
            <div>Click on your app to get started!</div>
          )}
        </div>

        <div className="app-chooser flex flex-col sticky top-0 z-10 backdrop-blur-md bg-opacity-70">
          <p className="text-xl font-semibold text-nowrap mb-4">Your Apps</p>
          <hr />

          <div className="flex flex-col mt-4">
            <ToggleGroup
              onValueChange={(value) => {
                if (value) setSelectedApp(value);
              }}
              className="flex md:flex-col"
              type="single"
              orientation="vertical"
            >
              <ToggleGroupItem
                className="md:min-w-40 flex justify-between"
                value="youtube"
              >
                <FaYoutube className="size-8 me-2" />
                <span className="text-base font-medium">Youtube</span>{" "}
              </ToggleGroupItem>
              <ToggleGroupItem
                className="md:min-w-40 flex justify-between"
                value="instagram"
              >
                <FaInstagram className="size-8 me-2" />
                <span className="text-base font-medium">Instagram</span>
              </ToggleGroupItem>
              <ToggleGroupItem
                className="md:min-w-40 flex justify-between"
                value="x"
              >
                <FaTwitter className="size-8 me-2" />{" "}
                <span className="text-base font-medium">X</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
