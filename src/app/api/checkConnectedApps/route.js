import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/db";
import User from "@/models/User";

export async function GET(req, res) {
  const email = await req.headers.get("email");
  console.log("Email:", email);
  await connectMongoDB();

  const user = await User.findOne({ email });
  // console.log("User: ",user)

  if (user) {
    return NextResponse.json({ connectedApps: user.connectedApps });
  } else {
    return NextResponse.json({ connectedApps: null });
  }
}
