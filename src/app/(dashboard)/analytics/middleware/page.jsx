"use client"
import React from "react";
import Image from "next/image"
function InstaMiddleware() {
  // Check if there is a fragment in the URL
  if (window.location.hash) {
    // Parse the fragment into a URLSearchParams object
    const fragmentParams = new URLSearchParams(window.location.hash.slice(1));

    // Extract the parameters
    const accessToken = fragmentParams.get("access_token");
    const dataAccessExpirationTime = fragmentParams.get(
      "data_access_expiration_time"
    );
    const tokenExpiry = fragmentParams.get("expires_in");

    // Redirect to the server with these parameters in the query string
    window.location.href = `/api/connect/instacallback?access_token=${accessToken}&data_access_expiration_time=${dataAccessExpirationTime}&expires_in=${tokenExpiry}`;
  }

  return (
    <div className="flex w-full h-full justify-center items-center">
     <Image
     className="h-52 w-52"
     src="/holdup.jpeg"
     width={500}
     height={500}
     alt="hold on tight, wait a second..."
     ></Image>
    </div>
  );
}
export default InstaMiddleware;
