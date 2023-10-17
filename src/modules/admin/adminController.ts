import { Request, RequestHandler, Response } from "express";
import { IAdmin } from "./adminInterafce";
import {
  createAdminService,
  deleteAdminService,
  getAllAdminService,
  getSingleAdminService,
  updateAdminService,
} from "./adminService";
import catchAsync from "../../helpers/catchAsync";
import reponseFormat from "../../helpers/responseFormat";
import APIError from "../../helpers/APIError";
export const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
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
// all user
export const getAllAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAllAdminService();

    reponseFormat<IAdmin[]>(res, {
      statusCode: 200,
      success: true,
      message: "Admin retrieved successfully",
      data: result,
    });
  }
);
// single user
export const getSingleAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await getSingleAdminService(id);

    reponseFormat<IAdmin>(res, {
      statusCode: 200,
      success: true,
      message: "Admin retrieved successfully",
      data: result,
    });
  }
);
// update
export const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await updateAdminService(id, updatedData);

  reponseFormat<IAdmin>(res, {
    statusCode: 200,
    success: true,
    message: "Admin updated successfully",
    data: result,
  });
});
// delete
export const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await deleteAdminService(id);

  reponseFormat<IAdmin>(res, {
    statusCode: 200,
    success: true,
    message: "Admin deleted successfully",
    data: result,
  });
});
