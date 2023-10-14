import { Secret } from "jsonwebtoken";
import config from "../../config";
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "../../interfaces/login";
import { createToken, verifyToken } from "../../helpers/jwtHelper";
import APIError from "../../helpers/APIError";
import { User } from "../user/userModel";
import { IUser } from "../user/userInterface";

// creating user
export const createUserService = async (user: IUser): Promise<IUser | null> => {
  if (!user.service) user.service = "normal";
  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new APIError(400, "failed to create User");
  }
  return createdUser;
};

// login
export const loginUserService = async (
  payload: ILoginUser
): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new APIError(404, "User does not exist");
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new APIError(401, "Password is incorrect");
  }

  //create access token & refresh token

  const { _id, role, service } = isUserExist;
  const accessToken = createToken(
    { _id, role, email, service },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = createToken(
    { _id, role, email, service },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};
// getrefresh
export const getRefreshTokenService = async (
  token: string
): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = verifyToken(token, config.jwt.refresh_secret as Secret);
  } catch (err) {
    throw new APIError(403, "Invalid Refresh Token");
  }

  const { email } = verifiedToken;

  // checking deleted user's refresh token

  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new APIError(404, "User does not exist");
  }
  //generate new token

  const newAccessToken = createToken(
    {
      _id: isUserExist._id,
      role: isUserExist.role,
      email: isUserExist.email,
      service: isUserExist.service,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};
