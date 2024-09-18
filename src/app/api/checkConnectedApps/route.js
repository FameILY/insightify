import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";


export async function GET(req, res){
    const email = await req.headers.get('email')
    console.log("Email:", email)
    const client = await clientPromise
    const db = client.db()
    const user = await db.collection('users').findOne({email})
    // console.log("User: ",user)

    if(user){
        return NextResponse.json({connectedApps: user.connectedApps})
    } else {
        return NextResponse.json({connectedApps: null})
    }

}