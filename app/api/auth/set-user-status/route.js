import { NextResponse } from 'next/server';
import { setUserStatus } from '@/app/actions/setUserStatus'; 

export async function POST(req) {
  try {
    const body = await req.json();
    const { user, status } = body;

    const result = await setUserStatus(user, status);
    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
