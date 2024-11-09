import { model, Schema } from 'mongoose';
import { TUser } from './User.interface';

const userSchema = new Schema<TUser>(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
    },
    role: {
      type: String,
    }
  },
  { timestamps: true },
);

export const User = model<TUser>('User', userSchema);
