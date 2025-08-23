import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ message: "Invalid verification token" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return NextResponse.json({ message: "Invalid verification token" }, { status: 400 });
    }

    user.verified = true;
    user.status = "verified";
    user.verificationToken = undefined;
    await user.save();

    return NextResponse.json({ message: "Email verified successfully!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
