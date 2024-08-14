import { TUser } from './User.interface';
import { createToken } from './User.utils';
import config from '../../config';
import { User } from './User.model';

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

export const UserServices = {
  createUser,
};
