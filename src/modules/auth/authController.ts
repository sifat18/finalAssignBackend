import { Request, RequestHandler, Response } from "express";
import { createUserService } from "./authService";
import catchAsync from "../../shared/catchAsync";
import { reponseAuthFormat, reponseFormat } from "../../shared/responseFormat";
import {
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "../../interfaces/login";
import { User } from "@prisma/client";
// signup
export const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...userData } = req.body;
    const result = await createUserService(userData);
    let dataWithoutPass;
    if (result) {
      const { password, ...rest } = result;
      dataWithoutPass = rest;
    }
    reponseFormat<Omit<User, "password">>(res, {
      success: true,
      statusCode: 200,
      message: "User created successfully !",
      data: dataWithoutPass,
    });
  }
);
