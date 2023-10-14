import { Model, Types } from "mongoose";
import { IUser } from "../user/userInterface";
import { IService } from "../service/serviceInterface";

export interface IOrder {
  services: Types.ObjectId | IService;
  client: Types.ObjectId | IUser;
  slots?: number;
}
export type OrderModel = Model<IOrder, Record<string, unknown>>;

export interface IUserInterfaceWithId extends IUser {
  _id: Types.ObjectId;
}
