import { Model } from "mongoose";
export type UserName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  name: UserName;
  role: "super-admin" | "admin" | "client";
  password: string;
  email: string;
  phoneNumber: Number;
  address?: string;
  service?: string;
};
export type UserModel = {
  isUserExist(email: string): Promise<IUser>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

export type IUserFilters = {
  searchTerm?: string;
  email?: string;
  phoneNumber?: number;
};
