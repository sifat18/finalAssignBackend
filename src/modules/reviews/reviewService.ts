import mongoose, { Types } from "mongoose";
import { IUser } from "../user/userInterface";
import { User } from "../user/userModel";
import { JwtPayload } from "jsonwebtoken";
import { Service } from "../service/serviceModel";
import APIError from "../../helpers/APIError";
import { IReview } from "./reviewInterface";
import { Review } from "./reviewModel";

export const createReviewService = async (
  data: IReview
): Promise<IReview | null> => {
  const serviceInfo = await Service.findOne({
    _id: new mongoose.Types.ObjectId(data?.services as Types.ObjectId),
  });
  //  info check
  if (!serviceInfo) {
    throw new APIError(404, "service not found");
  }
  // userInfo check
  const userInfo = await User.findOne({
    _id: new mongoose.Types.ObjectId(data?.client as Types.ObjectId),
  });
  if (!userInfo) {
    throw new APIError(404, "User not found");
  }
  if (userInfo.role !== "client") {
    throw new APIError(404, "order not possible for this user Role");
  }

  const newOrder = await Review.create(data);
  if (!newOrder) {
    throw new APIError(404, "Failed to create review");
  }

  return newOrder;
};
// get alll
export const getAllReviewService = async (
  id: string
): Promise<IReview[] | undefined> => {
  const result = Review.aggregate([
    {
      $match: {
        client: new mongoose.Types.ObjectId(id),
      },
    },

    {
      $lookup: {
        from: "users", // Assuming the client information is in the 'users' collection
        localField: "client",
        foreignField: "_id",
        as: "client",
      },
    },
    {
      $lookup: {
        from: "services", // Assuming the client information is in the 'users' collection
        localField: "services",
        foreignField: "_id",
        as: "services",
      },
    },
    {
      $unwind: "$client", // Deconstruct the 'client' array created by the lookup
    },
    {
      $unwind: "$services", // Deconstruct the 'client' array created by the lookup
    },

    {
      $project: {
        "client.password": 0, // Exclude the password field from client information
      },
    },
  ]);

  return result;
};
// single
export const getSingleReviewService = async (
  id: string,
  user: JwtPayload | null
): Promise<IReview | null | undefined> => {
  let result;
  let userIdAsObjecId = new mongoose.Types.ObjectId(user?._id);
  //  for admin
  if (
    (user?.role === "admin" && user?.service === "user-management") ||
    user?.role === "super-admin"
  ) {
    result = await Review.findOne({
      _id: new mongoose.Types.ObjectId(id),
    })
      .populate({
        path: "services",
        select: "-slots",
      })
      .populate({ path: "client", select: "-password" });
  }
  // buyer
  else if (user?.role === "client") {
    result = await Review.findOne({
      _id: new mongoose.Types.ObjectId(id),
    })
      .populate({
        path: "services",
        select: "-slots",
      })
      .populate({ path: "client", select: "-password" });
    const { client } = result as IReview;
    if (!(client as Types.ObjectId).equals(userIdAsObjecId)) {
      throw new APIError(403, "Forbidden");
    }
  }

  return result;
};
export const deleteReviewService = async (
  id: string,
  user: JwtPayload | null
): Promise<IReview | null | undefined> => {
  let result;
  if (user!.role === "client") {
    result = await Review.findByIdAndDelete({
      _id: new mongoose.Types.ObjectId(id),
      client: new mongoose.Types.ObjectId(user?._id),
    });
  } else {
    result = await Review.findByIdAndDelete({
      _id: new mongoose.Types.ObjectId(id),
    });
  }
  return result;
};
export const updateReviewService = async (
  id: string,
  payload: Partial<IReview>,
  user: JwtPayload | null
): Promise<IReview | null> => {
  const isExist = await Review.findOne({
    _id: new mongoose.Types.ObjectId(id),
    client: new mongoose.Types.ObjectId(user?._id),
  });

  if (!isExist) {
    throw new APIError(404, "Review not found !");
  }
  const updatedReviewData: Partial<IReview> = { ...payload };
  const result = await Review.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    updatedReviewData,
    {
      new: true,
    }
  );
  return result;
};
