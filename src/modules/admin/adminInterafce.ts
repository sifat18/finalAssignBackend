import { Model } from "mongoose";
import { UserName } from "../user/userInterface";
import { Admin_ROLE } from "./adminConstant";

export type IAdmin = {
  name: UserName;
  role: Admin_ROLE.ADMIN | Admin_ROLE.SUPER_ADMIN;
  password: string;
  phoneNumber: string;
  email: string;
  service: string;
  address?: string;
};
export type AdminModel = {
  isAdminExist(email: string): Promise<IAdmin>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;
// export type AdminModel = Model<IAdmin, Record<string, unknown>>;
