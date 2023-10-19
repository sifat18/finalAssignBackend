import mongoose, { SortOrder } from "mongoose";
import APIError from "../../helpers/APIError";
import { Service } from "./serviceModel";
import { IService, IServiceFilters } from "./serviceInterface";
import { IPaginationOptions } from "../../interfaces/pagination";
import { IGenericResponse } from "../../interfaces/error";
import { calculatePagination } from "../../helpers/paginationHelper";
import { serviceSearchableFields } from "../../helpers/pick";
import { Order } from "../booking/orderModel";
export const serviceCreate = async (
  service: IService
): Promise<IService | null> => {
  const createdService = await Service.create(service);

  if (!createdService) {
    throw new APIError(400, "failed to create Service");
  }
  return createdService;
};

// getting all
export const getServiceAll = async (
  filters: IServiceFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IService[]>> => {
  const { searchTerm, maxPrice, minPrice, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const andConditions = [];
  // search
  if (searchTerm) {
    andConditions.push({
      $or: serviceSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  // filter field
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $or: Object.entries(filtersData).map(([field, value]) => ({
        [field]: {
          $regex: value,
          $options: "i",
        },
      })),
    });
  }
  if (maxPrice) {
    andConditions.push({
      price: {
        $lte: Number(maxPrice),
      },
    });
  }

  if (minPrice) {
    andConditions.push({
      price: {
        $gte: Number(minPrice),
      },
    });
  }
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Service.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const count = await Service.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};
// single
export const singleGetService = async (
  id: string
): Promise<IService | null> => {
  const result = await Service.findOne({
    _id: new mongoose.Types.ObjectId(id),
  });
  return result;
};
// update
export const serviceUpdate = async (
  id: string,
  payload: Partial<IService>
): Promise<IService | null> => {
  const isExist = await Service.findOne({
    _id: new mongoose.Types.ObjectId(id),
  });

  if (!isExist) {
    throw new APIError(404, "Service not found !");
  }

  const { ...serviceData } = payload;

  const updatedServiceData: Partial<IService> = { ...serviceData };

  const result = await Service.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    updatedServiceData,
    {
      new: true,
    }
  );
  return result;
};
// delete
export const serviceDelete = async (id: string): Promise<IService | null> => {
  const isExist = await Order.aggregate([{ $match: { services: id } }]);
  if (isExist?.length > 0) {
    throw new APIError(400, "Service Cant be deleted as It is booked !");
  }

  const result = await Service.findByIdAndDelete({
    _id: new mongoose.Types.ObjectId(id),
  });
  return result;
};
