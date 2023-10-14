import mongoose from "mongoose";
import APIError from "../../helpers/APIError";
import { Service } from "./serviceModel";
import { IService } from "./serviceInterface";
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
export const getServiceAll = async (): Promise<IService[] | null> => {
  const total = await Service.find({});
  return total;
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
  const result = await Service.findByIdAndDelete({
    _id: new mongoose.Types.ObjectId(id),
  });
  return result;
};
