import { connectDB } from "@/app/lib/mongodb"
import User from "@/app/models/user"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {   
        const { email } = await req.json()
        
        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 })
        }

        await connectDB()
        const user = await User.findOne({ email })
        return NextResponse.json({ exists: !!user })
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Internal server error"}, {status: 500})
    }
} 