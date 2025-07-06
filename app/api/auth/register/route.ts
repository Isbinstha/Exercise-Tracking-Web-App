import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { validatePassword } from '@/utils/passwordValidation';

export async function POST(req: Request) {
  try {
    const { name, email, username, password } = await req.json();

    if (!name || !email || !username || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Validate password
    const { isValid, errors } = validatePassword(password);
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

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username }
      ]
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists with the same email/username' },
        { status: 400 }
      );
    }

    // Generate verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Create new user with verified: false and verificationCode
    try {
      const user = await User.create({
        name,
        email: email.toLowerCase(),
        username,
        password, // Will be hashed by pre-save hook
        verified: false,
        verificationCode,
      });

      // Send verification code via email
      await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/send-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, verificationCode }),
      });
      
      return NextResponse.json(
        { success: true, message: 'User created. Please check your email for a verification code.' },
        { status: 201 }
      );
    } catch (createError) {
      console.error('User creation error:', createError);
      return NextResponse.json(
        { success: false, message: 'Error creating user' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Error in registration' },
      { status: 500 }
    );
  }
}