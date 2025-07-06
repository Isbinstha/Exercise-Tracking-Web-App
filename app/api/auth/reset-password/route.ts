import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { validatePassword } from '@/utils/passwordValidation';

export async function POST(req: Request) {
  try {
    const { email, newPassword } = await req.json();

    if (!email || !newPassword) {
      return NextResponse.json(
        { message: 'Email and new password are required' },
        { status: 400 }
      );
    }
    
    // Validate password
    const { isValid, errors } = validatePassword(newPassword);
    if (!isValid) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Password does not meet security requirements', 
          errors 
        },
        { status: 400 }
      );
    }

    await connectDB();

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Set the new password - the User model's pre-save hook will handle hashing
    user.password = newPassword;
    
    console.log('Saving user with new password');
    const result = await user.save();
    console.log('User save result:', result);

    return NextResponse.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to reset password' },
      { status: 500 }
    );
  }
}