"use client";
import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";
import { useState } from "react";

function Analytics() {
  const [selectedApp, setSelectedApp] = useState("");

  return (
    <>
      <div className="flex w-full p-4">
        <div className="flex flex-col-reverse md:flex-row justify-normal md:justify-between md:gap-4 w-full">
          <div className="main-content flex flex-col border dark:border w-full">
            <ResizablePanelGroup direction="horizontal">
              {selectedApp === "youtube" ? (
                <ResizablePanel>
                  YouTube component goes here
                  </ResizablePanel>
              ) : selectedApp === "instagram" ? (
                <ResizablePanel>
                  Instagram component goes here
                  
                  </ResizablePanel>
              ) : selectedApp === "x" ? (
                <ResizablePanel>X component goes here</ResizablePanel>
              ) : (
                <ResizablePanel>Nothing </ResizablePanel>
              )}
              <ResizableHandle />
              <ResizablePanel>tbd</ResizablePanel>
            </ResizablePanelGroup>
          </div>

          <div className="app-chooser flex flex-col">
            <p className="text-xl font-semibold text-nowrap mb-4">Your Apps</p>
            <hr />

            <div className="flex flex-col mt-4">
              <ToggleGroup
                onValueChange={(value) => {
                  if (value) setSelectedApp(value);
                }}
                className="flex flex-col"
                type="single"
                orientation="vertical"
              >
                <ToggleGroupItem
                  className="min-w-40 flex justify-between"
                  value="youtube"
                >
                  <FaYoutube className="size-8 me-2" />
                  <span className="text-base font-medium">Youtube</span>{" "}
                </ToggleGroupItem>
                <ToggleGroupItem
                  className="min-w-40 flex justify-between"
                  value="instagram"
                >
                  <FaInstagram className="size-8 me-2" />
                  <span className="text-base font-medium">Instagram</span>
                </ToggleGroupItem>
                <ToggleGroupItem
                  className="min-w-40 flex justify-between"
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
    </>
  );
}

export default Analytics;
