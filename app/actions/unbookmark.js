'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { connectDB } from '@/app/lib/mongodb';
import User from '../models/user';

export async function unbookmarkFlight(flight) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return { error: 'Unauthorized' };
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return { error: 'User not found' };
    }

    const flightId = flight.id?.toString();
    if (!flightId) {
      return { error: 'Invalid flight ID' };
    }

    // Remove the flight object from bookmarks by comparing the flight id as string
    const beforeCount = user.bookmarks.length;
    user.bookmarks = user.bookmarks.filter(
      (bookmark) => String(bookmark.id) !== flightId
    );
    const afterCount = user.bookmarks.length;

    if (beforeCount === afterCount) {
      return { error: 'Bookmark not found' };
    }

    await user.save();

    return { success: 'Flight unbookmarked' };
  } catch (error) {
    console.error('Unbookmark error:', error);
    return { error: 'Failed to unbookmark flight' };
  }
}
