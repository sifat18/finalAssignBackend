import { NextFunction, Request, RequestHandler, Response } from "express";
import {
  createReviewService,
  deleteReviewService,
  getAllReviewService,
  getAllReviewServiceForAll,
  getSingleReviewService,
  updateReviewService,
} from "./reviewService";
import mongoose from "mongoose";
import catchAsync from "../../helpers/catchAsync";
import reponseFormat from "../../helpers/responseFormat";
import APIError from "../../helpers/APIError";
import { IReview } from "./reviewInterface";

export const createReview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await createReviewService(req.body);
    reponseFormat<IReview>(res, {
      statusCode: 200,
      success: true,
      message: "Review created successfully",
      data: result,
    });
  }
);
// get all
export const getAllReview = catchAsync(async (req: Request, res: Response) => {
  const { _id }: any = req.user;

  const result = await getAllReviewService(_id);

  reponseFormat<IReview[]>(res, {
    statusCode: 200,
    success: true,
    message: "Review retrieved successfully !",
    data: result,
  });
});
// get all
export const getAllReviewForAll = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAllReviewServiceForAll();

    reponseFormat<IReview[]>(res, {
      statusCode: 200,
      success: true,
      message: "Review retrieved successfully !",
      data: result,
    });
  }
);
// get 1
export const singleReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await getSingleReviewService(id, req.user);

  reponseFormat<IReview>(res, {
    statusCode: 200,
    success: true,
    message: "Review  retrieved successfully",
    data: result,
  });
});

// delete
export const deleteService = catchAsync(async (req: Request, res: Response) => {
  if (
    req.user!.service !== "user-management" &&
    req.user!.service !== "super-management" &&
    req.user!.role !== "client"
  )
    throw new APIError(401, "UnAuthorized Action !");

  const { id } = req.params;

  const result = await deleteReviewService(id, req.user);

  reponseFormat<IReview>(res, {
    statusCode: 200,
    success: true,
    message: "Review deleted successfully",
    data: result,
  });
});

// update
export const updateReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await updateReviewService(id, updatedData, req.user);

  reponseFormat<IReview>(res, {
    statusCode: 200,
    success: true,
    message: "Review updated successfully",
    data: result,
  });
});
