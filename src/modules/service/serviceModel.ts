import { Schema, model } from "mongoose";
import config from "../../config";
import { IService } from "./serviceInterface";
export const serviceSchema = new Schema<IService>(
  {
    name: { type: String, required: true, unique: true },
    serviceType: {
      type: String,
      required: true,
      enum: ["Wash and Fold", "Dry Cleaning", "Ironing and Pressing"],
    },
    price: { type: Number, required: true },
    slots: { type: Number, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["active", "upcoming", "inactive"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Service = model<IService>("Service", serviceSchema);
