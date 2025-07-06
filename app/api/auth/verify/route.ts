import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  const { email, code } = await req.json();
  if (!email || !code) {
    return NextResponse.json({ success: false, message: 'Email and code are required' }, { status: 400 });
  }
  await connectDB();
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  }
  if (user.verified) {
    return NextResponse.json({ success: true, message: 'User already verified' });
  }
  // Debug log for troubleshooting
  console.log('Comparing codes:', user.verificationCode, code);
  if (user.verificationCode?.toString() !== code.toString()) {
    return NextResponse.json({ success: false, message: 'Invalid verification code' }, { status: 400 });
  }
  user.verified = true;
  user.verificationCode = undefined;
  await user.save();
  return NextResponse.json({ success: true, message: 'Email verified successfully' });
} 