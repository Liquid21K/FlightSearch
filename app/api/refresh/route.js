// /app/api/refresh/route.js
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import User from "@/app/models/user"
import { connectDB } from "@/app/lib/mongodb"

export async function GET() {
  try {
    await connectDB()
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await User.findOne({ email: session.user.email })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        ...session.user,
        image: user.image,
      },
    })
  } catch (error) {
    console.error("Error in /api/refresh:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
