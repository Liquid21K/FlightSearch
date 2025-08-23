'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { connectDB } from '@/app/lib/mongodb';
import User from '../models/user';
import { NextResponse } from "next/server";

export async function bookmarkFlight(flight) {
  try {
   
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return { error: 'Unauthorized' };
    }

    const { email } = session.user;

    const user = await User.findOne({ email });
    if (!user) {
      return { error: 'User not found' };
    }

    // Check if flight is already bookmarked
    const isAlreadyBookmarked = user.bookmarks.some(
      (bookmark) => bookmark.id === flight.id
    );

    if (isAlreadyBookmarked) {
      return { error: 'Flight already bookmarked' };
    }

    

    // Add flight to bookmarks
    user.bookmarks.push(flight);
    await user.save();

    return { success: 'Flight bookmarked successfully' };
  } catch (error) {
    console.error('Bookmark error:', error);
    return { error: 'Failed to bookmark flight' };
  }
}
