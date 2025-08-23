'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { connectDB } from '../lib/mongodb';
import User from '../models/user';

export async function changeUserData({ user, content, contentName }) {
  try {
    await connectDB();

    // Get the current session
    const session = await getServerSession(authOptions);
    if (!session) {
      return { error: 'Unauthorized' };
    }

    // Get the current user (admin or regular user)
    const currentUser = await User.findOne({ email: session.user.email });
    if (!currentUser) {
      return { error: 'User not found' };
    }

    // Determine if this is an admin action
    const isAdminAction = currentUser.isAdmin === 'admin' && user && user.email !== session.user.email;

    if (!content || typeof content !== 'string') {
      return { error: 'Invalid or missing content' };
    }

    if (!contentName || typeof contentName !== 'string') {
      return { error: 'Invalid or missing contentName' };
    }

    // Special case for isAdmin field to preserve case
    const normalizedField = contentName === 'isAdmin' ? 'isAdmin' : contentName.toLowerCase().replace(/\s+/g, '');

    // If it's an admin action, use the provided user email
    const targetUser = isAdminAction 
      ? await User.findOne({ email: user.email })
      : currentUser;

    if (!targetUser) {
      return { error: 'Target user not found' };
    }

    // Check if user is paused (only for non-admin actions)
    if (!isAdminAction && targetUser.status === "paused") {
      return { error: 'Account is paused. Please contact an administrator.' };
    }

    // Check if the field exists in the schema
    if (!(normalizedField in targetUser)) {
      return { error: `Field '${normalizedField}' does not exist in User schema.` };
    }

    // Prevent changing certain fields for non-admin users
    const protectedFields = ['email', 'password', 'isAdmin', 'status', 'verified'];
    if (!isAdminAction && protectedFields.includes(normalizedField)) {
      return { error: `Cannot modify protected field: ${normalizedField}` };
    }

    // Update and save
    targetUser[normalizedField] = content;
    await targetUser.save();

    console.log(`${normalizedField} = ${targetUser[normalizedField]}`);

    return { success: true, message: 'User data updated successfully' };
  } catch (error) {
    console.error('Change user data error:', error);
    return { error: 'Failed to update user data' };
  }
}
