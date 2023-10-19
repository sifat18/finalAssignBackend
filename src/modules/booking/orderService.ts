import mongoose, { Types } from "mongoose";
import { IUser } from "../user/userInterface";
import { IOrder, IUserInterfaceWithId } from "./orderInterface";
import { User } from "../user/userModel";
import { Order } from "./orderModel";
import { JwtPayload } from "jsonwebtoken";
import { Service } from "../service/serviceModel";
import APIError from "../../helpers/APIError";

export const createOrderService = async (
  data: IOrder
): Promise<IOrder | null> => {
  const serviceInfo = await Service.findOne({
    _id: new mongoose.Types.ObjectId(data?.services as Types.ObjectId),
  });
  // cow info check
  if (!serviceInfo) {
    throw new APIError(404, "service not found");
  }
  if (serviceInfo.slots === 0) {
    throw new APIError(404, "service unavailable");
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
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const orderCount = await Order.countDocuments({
    services: serviceInfo?._id,
    createdAt: { $gte: currentDate },
  });

  if (orderCount >= serviceInfo?.slots) {
    throw new Error("No available slots for this service on the current day");
  }
  // order create
  const orderObject = {
    services: serviceInfo?._id,
    client: userInfo?._id,
    status: data?.status,
  };
  const newOrder = await Order.create(orderObject);
  if (!newOrder) {
    throw new APIError(404, "Failed to create order");
  }

  const result = await Order.findOne({
    _id: new mongoose.Types.ObjectId(newOrder?._id),
  })
    .populate({
      path: "services",
      // select: "-slots",
    })
    .populate({ path: "client", select: "-password" });
  return result;
};
// get alll
export const getAllOrderService = async (
  user: JwtPayload | null
): Promise<IOrder[] | undefined> => {
  let result;
  let userIdAsObjecId = new mongoose.Types.ObjectId(user?._id);
  //  for admin
  if (
    (user?.role === "admin" && user?.service === "user-management") ||
    user?.role === "super-admin"
  ) {
    result = await Order.find({})
      .populate({
        path: "services",
        select: "-slots",
      })
      .populate({ path: "client", select: "-password" });
  }
  // for buyer
  else if (user?.role === "client") {
    const exists = await Order.aggregate([
      { $match: { client: userIdAsObjecId } },
      {
        $lookup: {
          from: Service.collection.name,
          localField: "services",
          foreignField: "_id",
          as: "services",
        },
      },
      {
        $lookup: {
          from: User.collection.name,
          localField: "client",
          foreignField: "_id",
          as: "client",
        },
      },
      {
        $addFields: {
          services: { $arrayElemAt: ["$services", 0] },
          client: { $arrayElemAt: ["$client", 0] },
        },
      },

      {
        $project: {
          "client.password": 0,
        },
      },
    ]);

    result = exists?.length > 0 ? exists : [];
  }

  return result;
};
// single
export const getSingleOrderService = async (
  id: string,
  user: JwtPayload | null
): Promise<IOrder | null | undefined> => {
  let result;
  let userIdAsObjecId = new mongoose.Types.ObjectId(user?._id);
  //  for admin
  if (
    (user?.role === "admin" && user?.service === "user-management") ||
    user?.role === "super-admin"
  ) {
    result = await Order.findOne({
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
    result = await Order.findOne({
      _id: new mongoose.Types.ObjectId(id),
    })
      .populate({
        path: "services",
        select: "-slots",
      })
      .populate({ path: "client", select: "-password" });
    const { client } = result as IOrder;
    if (!(client as Types.ObjectId).equals(userIdAsObjecId)) {
      throw new APIError(403, "Forbidden");
    }
  }

  return result;
};
export const deleteOrderService = async (
  id: string
): Promise<IOrder | null | undefined> => {
  const result = await Order.findByIdAndDelete({
    _id: new mongoose.Types.ObjectId(id),
  });

  return result;
};

export const updateOrderService = async (
  id: string,
  payload: Partial<IOrder>,
  user: JwtPayload | null
): Promise<IOrder | null> => {
  const isExist = await Order.findOne({
    _id: new mongoose.Types.ObjectId(id),
    // client: new mongoose.Types.ObjectId(user?._id),
  });

  if (!isExist) {
    throw new APIError(404, "Order not found !");
  }
  const updatedOrderData: Partial<IOrder> = { ...payload };
  const result = await Order.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    updatedOrderData,
    {
      new: true,
    }
  );
  return result;
};
