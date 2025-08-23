'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { connectDB } from '@/app/lib/mongodb';
import User from '../models/user';

export async function checkAdmin(req, res) {
  try {
    await connectDB();

    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return { error: 'Unauthorized' };
    }

    const { email } = session.user;

    const user = await User.findOne({ email });
    if (!user) {
      return { error: 'User not found' };
    }

    if (user.isAdmin !== "admin") {
      return { error: 'User not admin' };
    }

    return { success: true, user };
  } catch (error) {
    console.error('Admin error:', error);
    return { error: 'Failed to auth user' };
  }
}
