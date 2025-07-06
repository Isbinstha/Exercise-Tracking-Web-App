import { Schema, model, models, Document } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
  verified: boolean;
  verificationCode?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  name: String,
  email: { type: String, unique: true },
  username: String,
  password: String,
  verified: { type: Boolean, default: false },
  verificationCode: String,
  // department field removed
  // Add other fields as needed
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Add comparePassword method
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = models.User || model<IUser>("User", UserSchema);
export default User; 