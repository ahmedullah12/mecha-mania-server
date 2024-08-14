/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type TUser = {
    name: string;
    email: string;
    password: string;
};

export type TLoginUser = {
    email: string;
    password: string;
};


export interface UserModel extends Model<TUser>{
    isUserExists(email: string):  Promise<TUser>;
    isPasswordMatch(plainPassword: string, hashPassword: string): Promise<boolean>;
}