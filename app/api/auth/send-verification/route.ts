import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
    const { email, verificationCode: providedCode } = await req.json();

    // Use provided code or generate a new one
    const verificationCode = providedCode || Math.floor(100000 + Math.random() * 900000).toString();

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Email Verification</h2>
          <p>Thank you for registering! Please use the following verification code to complete your registration:</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 24px; letter-spacing: 5px; margin: 20px 0;">
            <strong>${verificationCode}</strong>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this verification code, please ignore this email.</p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Do not return the code in the response
    return NextResponse.json({ 
      success: true, 
      message: 'Verification code sent successfully',
    });
  } catch (error) {
    console.error('Error sending verification email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send verification email' },
      { status: 500 }
    );
  }
} 