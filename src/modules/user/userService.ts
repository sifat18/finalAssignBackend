import mongoose, { SortOrder } from "mongoose";
import { IUser, IUserFilters } from "./userInterface";
import { User } from "./userModel";
import bcrypt from "bcrypt";
import config from "../../config";
import APIError from "../../helpers/APIError";
import { IPaginationOptions } from "../../interfaces/pagination";
import { IGenericResponse } from "../../interfaces/error";
import { calculatePagination } from "../../helpers/paginationHelper";
import { userSearchableFields } from "../../helpers/pick";

// getting all
export const getAllUserService = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const andConditions = [];
  // search
  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map((field) => ({
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
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const count = await User.countDocuments(whereConditions);

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
export const getSingleUserService = async (
  id: string
): Promise<IUser | null> => {
  const result = await User.findOne(
    { _id: new mongoose.Types.ObjectId(id) },
    { password: 0 }
  );
  return result;
};
// update
export const updateUserService = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: new mongoose.Types.ObjectId(id) });

  if (!isExist) {
    throw new APIError(404, "User not found !");
  }

  const { name, password, ...userData } = payload;
  let hashPas;
  if (password) {
    hashPas = await bcrypt.hash(password, Number(config.bycrypt_salt_rounds));
  }
  const updatedUserData: Partial<IUser> = { ...userData };
  if (hashPas) {
    updatedUserData["password"] = hashPas;
  }
  // dynamically handling

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await User.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    updatedUserData,
    {
      new: true,
    }
  );
  return result;
};
// delete
export const deleteUserService = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete({
    _id: new mongoose.Types.ObjectId(id),
  });
  return result;
};
