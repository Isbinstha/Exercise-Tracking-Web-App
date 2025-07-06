import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { message: 'No user found with this email' },
        { status: 404 }
      );
    }

    // Generate a 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>You have requested to reset your password. Please use the following verification code to proceed:</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 24px; letter-spacing: 5px; margin: 20px 0;">
            <strong>${verificationCode}</strong>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this password reset, please ignore this email.</p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: 'Verification code sent successfully',
      verificationCode // In production, store this securely
    });
  } catch (error) {
    console.error('Error sending verification email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send verification email' },
      { status: 500 }
    );
  }
} 