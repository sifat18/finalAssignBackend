import { Schema, model } from "mongoose";
import { User } from "../user/userModel";
import { IOrder, OrderModel } from "./orderInterface";
import { Service } from "../service/serviceModel";

export const orderSchema = new Schema<IOrder, OrderModel>(
  {
    services: { type: Schema.Types.ObjectId, ref: Service, required: true },
    client: { type: Schema.Types.ObjectId, ref: User, required: true },
    status: {
      type: String,
      enum: ["pending", "approved"],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Order = model<IOrder, OrderModel>("Order", orderSchema);
