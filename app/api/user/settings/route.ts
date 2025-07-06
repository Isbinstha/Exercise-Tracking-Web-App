"use server"
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  const { email, settings } = await req.json();
  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }
  await connectDB();
  const user = await User.findOneAndUpdate(
    { email: email.toLowerCase() },
    { $set: { settings } },
    { new: true }
  ).lean();
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
} 