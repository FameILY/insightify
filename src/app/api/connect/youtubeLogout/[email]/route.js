import connectMongoDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req, {params}) {
  try {
    const email = await params.email;
    console.log("params: ", email);
    const Authorization = await req.headers.get("Authorization");

    if (Authorization == process.env.NEXT_PUBLIC_API_KEY && email) {
      const result = await User.findOneAndUpdate(
        { email: email },
        { $unset: { "connectedApps.youtube": "" } },
        { new: true }
      );

      console.log(result);

      return NextResponse.json(
        { message: "Logged Out", result: result },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Unauthorized"},
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
