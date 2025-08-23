import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/user";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const currentUser = await User.findOne({ email: session.user.email });
        
        if (!currentUser || currentUser.isAdmin !== "admin") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const users = await User.find().select('-password -verificationToken');
        return NextResponse.json({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
} 