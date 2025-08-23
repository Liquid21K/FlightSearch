// actions/getbookmarks.js (or .ts)
'use server'

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { connectDB } from '../lib/mongodb';
import User from '../models/user';

export async function getBookmarks() {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: 'Unauthorized' };
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return { error: 'User not found' };
  }

  

  return user.bookmarks.map((bookmark) => ({
    id: bookmark.id,
    airline: bookmark.airline,
    flightNumber: bookmark.flightNumber,
    departure: bookmark.departure,
    arrival: bookmark.arrival,
    departureTime: bookmark.departureTime,
    arrivalTime: bookmark.arrivalTime,
    dof: bookmark.dof,
    duration: bookmark.duration,
    price: bookmark.price,
    checked: bookmark.checked,
    stops: bookmark.stops,
    logo: bookmark.logo,
  }));
}
