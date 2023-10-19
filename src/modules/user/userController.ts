import { Request, RequestHandler, Response } from "express";
import {
  deleteUserService,
  getAllUserService,
  getSingleUserService,
  updateUserService,
} from "./userService";
import { IUser } from "./userInterface";
import catchAsync from "../../helpers/catchAsync";
import reponseFormat from "../../helpers/responseFormat";
import APIError from "../../helpers/APIError";
import {
  paginationFields,
  pick,
  userFilterableFields,
} from "../../helpers/pick";

// all user
export const getAllUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    if (
      req.user!.service !== "user-management" &&
      req.user!.service !== "super-management"
    )
      throw new APIError(401, "UnAuthorized Action !");
    const filters = pick(req.query, userFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await getAllUserService(filters, paginationOptions);

    reponseFormat<IUser[]>(res, {
      statusCode: 200,
      success: true,
      message: "Users retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);
// single user
export const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  if (
    req.user!.service !== "user-management" &&
    req.user!.service !== "super-management"
  )
    throw new APIError(401, "UnAuthorized Action !");

  const { id } = req.params;

  const result = await getSingleUserService(id);

  reponseFormat<IUser>(res, {
    statusCode: 200,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

// single user profile
export const getProfile = catchAsync(async (req: Request, res: Response) => {
  if (
    req.user!.service !== "user-management" &&
    req.user!.service !== "super-management" &&
    req.user!.role !== "client"
  )
    throw new APIError(401, "UnAuthorized Action !");

  const result = await getSingleUserService(req?.user?._id);

  reponseFormat<IUser>(res, {
    statusCode: 200,
    success: true,
    message: "User's information retrieved successfully",
    data: result,
  });
});
// update profile
export const updateUserProfile = catchAsync(
  async (req: Request, res: Response) => {
    // const { id } = req.params;
    const updatedData = req.body;

    const result = await updateUserService(req?.user?._id, updatedData);

    reponseFormat<IUser>(res, {
      statusCode: 200,
      success: true,
      message: "User updated successfully",
      data: result,
    });
  }
);
// update
export const updateUser = catchAsync(async (req: Request, res: Response) => {
  if (
    req.user!.service !== "user-management" &&
    req.user!.service !== "super-management"
  )
    throw new APIError(401, "UnAuthorized Action !");

  const { id } = req.params;
  const updatedData = req.body;

  const result = await updateUserService(id, updatedData);

  reponseFormat<IUser>(res, {
    statusCode: 200,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});
// delete
export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  if (
    req.user!.service !== "user-management" &&
    req.user!.service !== "super-management"
  )
    throw new APIError(401, "UnAuthorized Action !");

  const { id } = req.params;

  const result = await deleteUserService(id);

  reponseFormat<IUser>(res, {
    statusCode: 200,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});
