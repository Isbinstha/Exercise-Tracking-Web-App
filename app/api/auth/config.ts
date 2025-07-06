import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing email or password in credentials');
          throw new Error("Please enter an email and password");
        }
        
        console.log('Login attempt for email:', credentials.email);
        
        try {
          await connectDB();
          console.log('Connected to database, searching for user:', credentials.email.toLowerCase());
          
          const user = await User.findOne({ email: credentials.email.toLowerCase() }).select("+password");

          if (!user) {
            console.log("No user found for email:", credentials.email);
            throw new Error("Invalid email or password");
          }
          
          console.log('User found. User ID:', user._id);
          console.log('Stored password hash:', user.password ? 'exists' : 'missing');
          
          if (!user.password) {
            console.error('No password hash found for user:', user.email);
            throw new Error("Account configuration error. Please contact support.");
          }
          
          // Log the first few characters of the stored hash for debugging
          console.log('Hash prefix:', user.password.substring(0, 10) + '...');
          
          // Use the comparePassword method from the User model
          console.log('Starting password comparison...');
          const isPasswordValid = await user.comparePassword(credentials.password);
          console.log('Password comparison result:', isPasswordValid);
          
          if (!isPasswordValid) {
            console.log('Password comparison failed for user:', user.email);
            console.log('Provided password length:', credentials.password.length);
            console.log('Hash length:', user.password.length);
            throw new Error("Invalid email or password");
          }
          
          console.log('Authentication successful for user:', user.email);
          
          // Return only the necessary user data
          const userData = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            username: user.username,
            department: user.department,
            avatar: user.avatar,
          };
          
          console.log('Returning user data:', JSON.stringify(userData, null, 2));
          return userData;
        } catch (error) {
          console.error('Authentication error:', error);
          throw error; // Re-throw the error to be handled by NextAuth
        }

      }
// ...existing code...
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.department = (user as any).department;
        token.avatar = (user as any).avatar;
        token.username = (user as any).username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // Explicitly cast session.user to the augmented type
        const augmentedUser = session.user as typeof session.user & {
          id: string;
          department: string;
          avatar: string;
          username: string;
        };
        augmentedUser.id = token.id as string;
        augmentedUser.department = token.department as string;
        augmentedUser.avatar = token.avatar as string;
        augmentedUser.username = token.username as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}; 