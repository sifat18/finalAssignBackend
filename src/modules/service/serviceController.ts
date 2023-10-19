import { Request, RequestHandler, Response } from "express";
import {
  getServiceAll,
  serviceCreate,
  serviceDelete,
  serviceUpdate,
  singleGetService,
} from "./serveService";
import catchAsync from "../../helpers/catchAsync";
import reponseFormat from "../../helpers/responseFormat";
import APIError from "../../helpers/APIError";
import { IService } from "./serviceInterface";
import {
  paginationFields,
  pick,
  serviceFilterableFields,
} from "../../helpers/pick";

export const createService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    if (
      req.user!.service !== "content-management" &&
      req.user!.service !== "super-management"
    ) {
      throw new APIError(401, "UnAuthorized Action !");
    }
    const { ...serviceData } = req.body;
    const result = await serviceCreate(serviceData);

    reponseFormat<IService>(res, {
      success: true,
      statusCode: 200,
      message: "Service created successfully !",
      data: result,
    });
  }
);

// all user
export const getAllService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    if (
      req.user!.service !== "content-management" &&
      req.user!.service !== "super-management" &&
      req.user!.role !== "client"
    ) {
      throw new APIError(401, "UnAuthorized Action !");
    }

    const filters = pick(req.query, serviceFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await getServiceAll(filters, paginationOptions);

    reponseFormat<IService[]>(res, {
      statusCode: 200,
      success: true,
      message: "Services retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);
// single user
export const getSingleService = catchAsync(
  async (req: Request, res: Response) => {
    if (
      req.user!.service !== "content-management" &&
      req.user!.service !== "super-management"
    ) {
      throw new APIError(401, "UnAuthorized Action !");
    }
    const { id } = req.params;

    const result = await singleGetService(id);

    reponseFormat<IService>(res, {
      statusCode: 200,
      success: true,
      message: "Service retrieved successfully",
      data: result,
    });
  }
);

// update
export const updateService = catchAsync(async (req: Request, res: Response) => {
  if (
    req.user!.service !== "content-management" &&
    req.user!.service !== "super-management"
  ) {
    throw new APIError(401, "UnAuthorized Action !");
  }
  const { id } = req.params;
  const updatedData = req.body;

  const result = await serviceUpdate(id, updatedData);

  reponseFormat<IService>(res, {
    statusCode: 200,
    success: true,
    message: "Service updated successfully",
    data: result,
  });
});
// delete
export const deleteService = catchAsync(async (req: Request, res: Response) => {
  if (
    req.user!.service !== "content-management" &&
    req.user!.service !== "super-management"
  ) {
    throw new APIError(401, "UnAuthorized Action !");
  }

  const { id } = req.params;

  const result = await serviceDelete(id);

  reponseFormat<IService>(res, {
    statusCode: 200,
    success: true,
    message: "Service deleted successfully",
    data: result,
  });
});
