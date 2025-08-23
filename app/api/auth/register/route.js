import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/user";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { sendVerificationEmail } from "@/app/components/(auth)/Fields/sendVerificationEmail"; 

export async function POST(req) {
  try {
    const { email, password, firstname, lastname, gender, dob } = await req.json();

    if (!email || !password || !firstname || !lastname || !gender || !dob) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const dateOfBirth = new Date(dob);
    if (isNaN(dateOfBirth)) {
      return NextResponse.json({ message: "Invalid date of birth" }, { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = uuidv4(); // 🔥 Generate random token

    const user = new User({
      email,
      password: hashedPassword,
      firstname,
      lastname,
      gender,
      dob: dateOfBirth,
      verified: false,
      verificationToken, // 🔥 Save token
    });

    await user.save();
    console.log("User created:", user);

    // 🔥 Send verification email
    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json({ message: "Registration successful! Please verify your email." });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
