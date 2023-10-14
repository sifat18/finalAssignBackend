import mongoose from "mongoose";
import { IUser } from "./userInterface";
import { User } from "./userModel";
import bcrypt from "bcrypt";
import config from "../../config";
import APIError from "../../helpers/APIError";

// getting all
export const getAllUserService = async (): Promise<IUser[] | null> => {
  const total = await User.find({});
  return total;
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
