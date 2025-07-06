"use server"
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(req: Request) {
  const url = req.url || '';
  const { searchParams } = new URL(url, 'http://localhost');
  const email = searchParams.get('email');
  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }
  await connectDB();
  const user = await User.findOne({ email: email.toLowerCase() }).lean();
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }
  // Remove sensitive fields
  delete user.password;
  return NextResponse.json(user);
} 