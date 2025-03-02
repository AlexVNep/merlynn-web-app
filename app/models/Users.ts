import { Model } from "mongoose";
import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User: Model<IUser> = models?.User || model<IUser>("User", userSchema);
export default User;
