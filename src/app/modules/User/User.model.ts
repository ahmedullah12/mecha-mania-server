import { model, Schema } from "mongoose";
import { TUser } from "./User.interface";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

userSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password, 12);

    next();
})



export const User = model<TUser>("User", userSchema);