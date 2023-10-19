import { NextFunction, Request, RequestHandler, Response } from "express";
import { IOrder } from "./orderInterface";
import {
  createOrderService,
  deleteOrderService,
  getAllOrderService,
  getSingleOrderService,
  updateOrderService,
} from "./orderService";
import mongoose from "mongoose";
import { Order } from "./orderModel";
import catchAsync from "../../helpers/catchAsync";
import reponseFormat from "../../helpers/responseFormat";
import APIError from "../../helpers/APIError";

export const createOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await createOrderService(req.body);
    reponseFormat<IOrder>(res, {
      statusCode: 200,
      success: true,
      message: "Order created successfully",
      data: result,
    });
  }
);
// get all
export const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await getAllOrderService(req.user);

  reponseFormat<IOrder[]>(res, {
    statusCode: 200,
    success: true,
    message: "Orders retrieved successfully !",
    data: result,
  });
});
// get 1
export const singleOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await getSingleOrderService(id, req.user);

  reponseFormat<IOrder>(res, {
    statusCode: 200,
    success: true,
    message: "Order information retrieved successfully",
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

  const result = await deleteOrderService(id);

  reponseFormat<IOrder>(res, {
    statusCode: 200,
    success: true,
    message: "Order deleted successfully",
    data: result,
  });
});
// update
export const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await updateOrderService(id, updatedData, req.user);

  reponseFormat<IOrder>(res, {
    statusCode: 200,
    success: true,
    message: "Order updated successfully",
    data: result,
  });
});
