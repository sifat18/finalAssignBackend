import { Model, Types } from "mongoose";
import { IUser } from "../user/userInterface";
import { IService } from "../service/serviceInterface";

export interface IReview {
  services: Types.ObjectId | IService;
  client: Types.ObjectId | IUser;
  message: string;
  rating: number;
}
export type ReviewModel = Model<IReview, Record<string, unknown>>;

export interface IUserInterfaceWithId extends IUser {
  _id: Types.ObjectId;
}
