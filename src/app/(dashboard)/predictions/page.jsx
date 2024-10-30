// "use client";
// import React, { useEffect, useState } from "react";
// import Insights from "@/components/facebook/Insights";
// import {
//   initiateFacebookLogin,
//   fetchInstagramAccountId,
//   fetchInstagramAccountDetails,
// } from "@/app/api/facebook/api";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// function Prediction() {
//   const [accessToken, setAccessToken] = useState(null);
//   const [igAccountId, setIgAccountId] = useState(null);
//   const [accountDetails, setAccountDetails] = useState(null);
//   const [showInsights, setShowInsights] = useState(false);
//   const [error, setError] = useState(null);

//   const handleLoginClick = async () => {
//     initiateFacebookLogin();
//   };

//   const fetchLongLivedToken = async (shortLivedToken) => {
//     const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID; // Replace with your app ID
//     const appSecret = process.env.NEXT_PUBLIC_FACEBOOK_APP_SECRET; // Replace with your app secret
//     console.log(appId, appSecret);

//     const response = await fetch(
//       `https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${shortLivedToken}`
//     );

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(
//         `Failed to fetch long-lived token: ${errorData.error.message}`
//       );
//     }

//     const data = await response.json();
//     return data.access_token;
//   };

//   const handleFetchInsightsClick = async () => {
//     const hash = window.location.hash;
//     const params = new URLSearchParams(hash.replace("#", "?"));
//     const shortLivedToken = params.get("access_token");

//     if (shortLivedToken) {
//       try {
//         // Fetch long-lived token
//         const longLivedToken = await fetchLongLivedToken(shortLivedToken);
//         console.log("Long-Lived Access Token:", longLivedToken);
//         setAccessToken(longLivedToken); // Set the long-lived token

//         const pages = await fetchInstagramAccountId(longLivedToken);
//         const instagramPage = pages.find(
//           (page) => page.instagram_business_account
//         );
//         if (instagramPage) {
//           const igAccountId = instagramPage.instagram_business_account.id;
//           setIgAccountId(igAccountId);
//           setShowInsights(true);

//           // Fetch account details
//           const details = await fetchInstagramAccountDetails(
//             igAccountId,
//             longLivedToken
//           );
//           setAccountDetails(details);
//         } else {
//           setError("No Instagram Business Account found");
//         }
//       } catch (err) {
//         setError(err.message);
//       }
//     } else {
//       setError("Access token not found. Please log in.");
//     }
//   };

//   // Check for access token on component mount
//   useEffect(() => {
//     const hash = window.location.hash;
//     const params = new URLSearchParams(hash.replace("#", "?"));
//     const token = params.get("access_token");
//     if (token) {
//       setAccessToken(token);
//     }
//   }, []); // Run once on mount

//   return (
//     <div className="flex flex-col justify-center items-center w-full ">
//       <h1>Instagram Initial Tests (only for developers and testers)</h1>
//       <Button className="m-4" onClick={handleLoginClick}>
//         Login with Facebook
//       </Button>
//       <Button
//         className="m-4"
//         onClick={handleFetchInsightsClick}
//         disabled={!accessToken}
//       >
//         Fetch Insights
//       </Button>

//       {/* Conditionally render the account details */}
//       {accountDetails && (
//         <div>
//           <h2>Account Details</h2>
//         <div className="h-44 w-96 overflow-y-auto">
          
//           <pre>{JSON.stringify(accountDetails, null, 2)}</pre>
//           </div>
//           <Image
//           className="rounded-full h-20 w-20"
//             src={accountDetails.profile_picture_url}
//             alt="Profile"
//             width={500}
//             height={500}
//           />
//           <p>Name: {accountDetails.username}</p>
//           <p>Followers: {accountDetails.followers_count}</p>
//         </div>
//       )}
//       {/* Conditionally render the Insights component */}
//       {showInsights && (
//         <div className="flex h-96 w-96 overflow-y-auto">
//           <Insights igMediaId={igAccountId} accessToken={accessToken} />
//         </div>
//       )}
//       {error && <div>Error: {error}</div>}
//     </div>
//   );
// }

// export default Prediction;


import React from 'react'

function Prediction() {
  return (
    <div>Predictons Comming Soon!</div>
  )
}

export default Prediction;