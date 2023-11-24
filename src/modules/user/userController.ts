import { Request, RequestHandler, Response } from "express";
import {
  // deleteUserService,
  // getAllUserService,
  getSingleUserService,
  updateUserService,
} from "./userService";

import { User } from "@prisma/client";
import catchAsync from "../../shared/catchAsync";
import pick from "../../shared/pick";
import APIError from "../../errorHelpers/APIError";
import { reponseFormat } from "../../shared/responseFormat";

// all user
// export const getAllUser: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     if (
//       req.user!.service !== "user-management" &&
//       req.user!.service !== "super-management"
//     )
//       throw new APIError(401, "UnAuthorized Action !");
//     const filters = pick(req.query, userFilterableFields);
//     const paginationOptions = pick(req.query, paginationFields);

//     const result = await getAllUserService(filters, paginationOptions);

//     reponseFormat<User[]>(res, {
//       statusCode: 200,
//       success: true,
//       message: "Users retrieved successfully",
//       meta: result.meta,
//       data: result.data,
//     });
//   }
// );
// single user
export const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  if (
    req.user!.service !== "user-management" &&
    req.user!.service !== "super-management"
  )
    throw new APIError(401, "UnAuthorized Action !");

  const { id } = req.params;

  const result = await getSingleUserService(id);

  reponseFormat<User>(res, {
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
    req.user!.role !== "normal_user"
  )
    throw new APIError(401, "UnAuthorized Action !");

  const result = await getSingleUserService(req?.user?._id);

  reponseFormat<User>(res, {
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

    const result = await updateUserService(req?.user?.id, updatedData);

    reponseFormat<User>(res, {
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
    req.user!.service !== "user_management" &&
    req.user!.service !== "normal_user" &&
    req.user!.service !== "super_management"
  )
    throw new APIError(401, "UnAuthorized Action !");

  const { id } = req.params;
  const updatedData = req.body;

  const result = await updateUserService(id, updatedData);

  reponseFormat<User>(res, {
    statusCode: 200,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});
// // delete
// export const deleteUser = catchAsync(async (req: Request, res: Response) => {
//   if (
//     req.user!.service !== "user_management" &&
//     req.user!.service !== "super_management"
//   )
//     throw new APIError(401, "UnAuthorized Action !");

//   const { id } = req.params;

//   const result = await deleteUserService(id);

//   reponseFormat<User>(res, {
//     statusCode: 200,
//     success: true,
//     message: "User deleted successfully",
//     data: result,
//   });
// });
