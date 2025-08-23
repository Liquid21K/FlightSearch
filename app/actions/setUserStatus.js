'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { connectDB } from '@/app/lib/mongodb';
import User from '../models/user';

export async function setUserStatus(user, status) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return { error: 'Unauthorized' };
    }

    const userAdmin = await User.findOne({ email: session.user.email });
    if (!userAdmin) {
      return { error: 'User not found' };
    }

    if (userAdmin.isAdmin !== 'admin') {
        return { error: 'User not admin' };
    }
    
    const targetUser = await User.findOne({ email: user.email });
    if (!targetUser) {
      return { error: 'User not found' };
    }

    targetUser.status = status
    await targetUser.save();

    return { success: 'User status changed' };
  } catch (error) {
    console.error('User Status error:', error);
    return { error: 'Failed to change status to user' };
  }
}
