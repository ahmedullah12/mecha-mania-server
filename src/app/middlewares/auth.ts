/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from '../error/AppError';
import httpStatus from 'http-status';
import { User } from '../modules/User/User.model';

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const fullToken = req.headers.authorization;

    if(!fullToken) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized.")
    }
    const token = fullToken?.split(' ')[1];
    
    const decoded = jwt.decode(token) as JwtPayload;
    

    const isUserExists = await User.findOne({ clerkId: decoded.clerkId });

    if(!isUserExists){
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized.")
    }
   
    next();
  });
};

export default auth;
