import { TLoginUser, TUser } from './User.interface';
import { createToken } from './User.utils';
import config from '../../config';
import { User } from './User.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';

const createUser = async (payload: TUser) => {
  const jwtPayload = {
    email: payload?.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_token_secret as string,
    '1d',
  );
  const refreshToken = createToken(
    jwtPayload,
    config.refresh_token_secret as string,
    '30d',
  );
  const user = await User.create(payload);

  return {
    accessToken,
    refreshToken,
    user,
  };
};


const loginUser = async(payload: TLoginUser) => {
  const user = await User.isUserExists(payload.email);
  if(!user){
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isPasswordMatch = await User.isPasswordMatch(payload.password, user.password);
  if(!isPasswordMatch){
    throw new AppError(httpStatus.BAD_REQUEST, "Password doesn't match");
  };

  const jwtPayload = {
    email: user.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_token_secret as string,
    '1d',
  );
  const refreshToken = createToken(
    jwtPayload,
    config.refresh_token_secret as string,
    '30d',
  );

  return {
    refreshToken,
    accessToken,
    user
  }
}

export const UserServices = {
  createUser,
  loginUser
};
