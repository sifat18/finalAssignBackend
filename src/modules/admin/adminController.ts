import { Request, RequestHandler, Response } from "express";
import { IUser } from "../user/userInterface";
import { IAdmin } from "./adminInterafce";
import { createAdminService } from "./adminService";
import catchAsync from "../../helpers/catchAsync";
import reponseFormat from "../../helpers/responseFormat";
import APIError from "../../helpers/APIError";
export const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    if (req.user!.role !== "super-admin")
      throw new APIError(401, "UnAuthorized Action !");

    const { ...adminData } = req.body;
    const result = await createAdminService(adminData);
    let dataWithoutPass;
    if (result) {
      const { password, ...rest } = result?._doc;
      dataWithoutPass = rest;
    }
    reponseFormat<Omit<IAdmin, "password">>(res, {
      success: true,
      statusCode: 200,
      message: "Admin created successfully !",
      data: dataWithoutPass,
    });
  }
);
