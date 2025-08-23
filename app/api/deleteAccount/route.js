import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import User from '@/app/models/user';

export async function DELETE(request) {
  try {
    // In a real application, you would:
    // 1. Authenticate the user (e.g., verify session token, JWT)
    // 2. Authorize the request (e.g., ensure the user has permission to delete this account)
    // 3. Extract the user ID from the request (e.g., from request body, headers, or session)

    // Example: Assuming you get a userId from the request body for demonstration
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    // Connect to the database
    await connectDB();

    // Find and delete the user
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Account deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
