import { Secret } from "jsonwebtoken";
import config from "../../config";
import bcrypt from "bcrypt";

import APIError from "../../errorHelpers/APIError";
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "../../interfaces/login";
import { createToken, verifyToken } from "../../shared/jwtHelper";
// import { IUser } from "../user/userInterface";
// import { User } from "../user/userModel";
import { Prisma, User } from "@prisma/client";
import prisma from "../../shared/prisma";

// creating user
export const createUserService = async (user: User): Promise<User | null> => {
  const hashedPassword = await bcrypt.hash(
    user?.password,
    Number(config.bycrypt_salt_rounds)
  );
  user.password = hashedPassword;

  const result = await prisma.user.create({
    data: user,
  });
  if (!result) {
    throw new APIError(400, "failed to create User");
  }
  return result;
};
