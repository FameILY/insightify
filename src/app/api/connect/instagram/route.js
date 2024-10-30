//api for facebook login (instagram)
import { NextResponse } from "next/server";

export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
    redirect_uri: process.env.NEXT_PUBLIC_FACEBOOK_APP_REDIRECT_URI,
    config_id: process.env.NEXT_PUBLIC_FACEBOOK_APP_CONFIG_ID,
    scope:
      "instagram_basic,pages_show_list,business_management,read_insights,instagram_manage_insights,pages_read_engagement",
    response_type: "token",
  });

  const url = `https://www.facebook.com/v21.0/dialog/oauth?${params.toString()}`;

  return NextResponse.redirect(url);
}
