import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import connectMongoDB from "@/lib/db";
import User from "@/models/User";


export const fetchInstagramAccountId = async (accessToken) => {
  const response = await fetch(`https://graph.facebook.com/v21.0/me/accounts?fields=instagram_business_account&access_token=${accessToken}`);
  if (!response.ok) {
      throw new Error('Failed to fetch Instagram account ID');
  }
  const data = await response.json();
  return data.data; // Return the list of pages/accounts
};



const fetchLongLivedToken = async (shortLivedToken) => {
  const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID; // Replace with your app ID
  const appSecret = process.env.NEXT_PUBLIC_FACEBOOK_APP_SECRET; // Replace with your app secret
  console.log(appId, appSecret);

  const response = await fetch(
    `https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${shortLivedToken}`
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Failed to fetch long-lived token: ${errorData.error.message}`
    );
  }

  const data = await response.json();
  console.log("LONGLIVED: ", data);
  return data;
};

//
export async function GET(req) {
  try {
    // Extract the code from the query parameters
    const url = new URL(req.url, process.env.NEXTAUTH_URL);
    const accessToken = url.searchParams.get("access_token");
    const dataAccessExpirationTime = url.searchParams.get(
      "data_access_expiration_time"
    );
    const tokenExpiry = url.searchParams.get("expires_in");

    if (!accessToken) {
      return NextResponse.json({ message: "Error: No Access Token provided" });
    }

    // Exchange shortlivedtoken for longlived
    const longLivedAccessTokenData = await fetchLongLivedToken(accessToken);

    //calculate expiry
    // Calculate the expiration date
    const currentTime = new Date();
    const expirationDate = new Date(
      currentTime.getTime() + longLivedAccessTokenData.expires_in * 1000
    ); // expires_in in milliseconds

    //get account ids --------

    const data = await fetchInstagramAccountId(longLivedAccessTokenData.access_token)

    const checkIfBusiness = data.find(
      (page) => page.instagram_business_account
    );

    if (!checkIfBusiness) {
      return NextResponse.json({
        message: "No Business Account Found",
      }, { status: 401});
    }

    const accountId = data[0].id
    const bussinessId = data[0].instagram_business_account.id


    // -------------
    const tokens = {
      access_token: longLivedAccessTokenData.access_token,
      data_access_expiration_time: dataAccessExpirationTime,
      expires_in: longLivedAccessTokenData.expires_in,
      expiry_date: expirationDate,
      token_type: longLivedAccessTokenData.token_type,
      account_id: accountId,
      instagram_business_account: bussinessId,
    };
    // Get the session to find the logged-in user
    const session = await getServerSession({ req });

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({
        message: "Error: Unable to retrieve user session",
      });
    }

    const email = session.user.email;
    console.log("heyyyyyyyyy");
    console.log("EMAIL: ", email);
    console.log("TOKENS: ", tokens);
    // Save the tokens in MongoDB
    try {
      await connectMongoDB();

      const result = await User.updateOne(
        { email },
        {
          $set: {
            "connectedApps.instagram": tokens,
          },
        }
      );

      console.log("updated user connected Apps: ", result);

      // await client.close();

      // Redirect to dashboard after successful connection
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/settings`);
    } catch (dbError) {
      console.error("Error saving YouTube token to MongoDB", dbError);
      return NextResponse.json({ message: "Error saving YouTube token" });
    }
  } catch (error) {
    console.error("Error during YouTube OAuth callback", error);
    return NextResponse.json({
      message: "Error retrieving or saving YouTube token",
    });
  }
}

export const dynamic = "force-dynamic";
