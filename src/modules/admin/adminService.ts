import mongoose from "mongoose";
import APIError from "../../helpers/APIError";
import { User } from "../user/userModel";
import { IAdmin } from "./adminInterafce";
import { Admin } from "./adminModel";
import config from "../../config";
import bcrypt from "bcrypt";

// creating user
export const createAdminService = async (
  user: IAdmin
): Promise<IAdmin | null> => {
  const createdAdmin = await Admin.create(user);
  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new APIError(400, "failed to create Admin");
  }

  if (!createdAdmin) {
    throw new APIError(400, "failed to create Admin");
  }
  return createdAdmin;
};
// getting all
export const getAllAdminService = async (): Promise<Promise<IAdmin[] | []>> => {
  const result = await Admin.find({});

  return result;
};
// single
export const getSingleAdminService = async (
  id: string
): Promise<IAdmin | null> => {
  const result = await Admin.findOne(
    { _id: new mongoose.Types.ObjectId(id) },
    { password: 0 }
  );
  return result;
};
// update
export const updateAdminService = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ _id: new mongoose.Types.ObjectId(id) });

  if (!isExist) {
    throw new APIError(404, "Admin not found !");
  }

  const { name, password, ...userData } = payload;
  let hashPas;
  if (password) {
    hashPas = await bcrypt.hash(password, Number(config.bycrypt_salt_rounds));
  }
  const updatedUserData: Partial<IAdmin> = { ...userData };
  if (hashPas) {
    updatedUserData["password"] = hashPas;
  }
  // dynamically handling

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}` as keyof Partial<IAdmin>;
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Admin.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    updatedUserData,
    {
      new: true,
    }
  );
  return result;
};
// delete
export const deleteAdminService = async (
  id: string
): Promise<IAdmin | null> => {
  const result = await Admin.findByIdAndDelete({
    _id: new mongoose.Types.ObjectId(id),
  });
  return result;
};
