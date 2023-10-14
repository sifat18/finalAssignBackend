import { Schema, model } from "mongoose";
import { User } from "../user/userModel";
import { Service } from "../service/serviceModel";
import { IReview, ReviewModel } from "./reviewInterface";

export const ReviewSchema = new Schema<IReview, ReviewModel>(
  {
    services: { type: Schema.Types.ObjectId, ref: Service, required: true },
    client: { type: Schema.Types.ObjectId, ref: User, required: true },
    message: { type: String, required: true },
    date: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Review = model<IReview, ReviewModel>("Review", ReviewSchema);
