import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  betterAuthId: string;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    betterAuthId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// Ensure we don't redefine the model
const User: Model<IUser> =
  mongoose.models?.User || mongoose.model<IUser>("User", userSchema);

export default User;
