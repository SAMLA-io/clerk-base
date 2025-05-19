import { verifyToken } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    
    if (!token) {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      );
    }

    const claims = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY || ""
    });

    console.log(claims);
    return NextResponse.json({ claims });
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify token" },
      { status: 401 }
    );
  }
} 