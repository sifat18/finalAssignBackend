"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderService = exports.deleteOrderService = exports.getSingleOrderService = exports.getAllOrderService = exports.createOrderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = require("../user/userModel");
const orderModel_1 = require("./orderModel");
const serviceModel_1 = require("../service/serviceModel");
const APIError_1 = __importDefault(require("../../helpers/APIError"));
const createOrderService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceInfo = yield serviceModel_1.Service.findOne({
        _id: new mongoose_1.default.Types.ObjectId(data === null || data === void 0 ? void 0 : data.services),
    });
    // cow info check
    if (!serviceInfo) {
        throw new APIError_1.default(404, "service not found");
    }
    if (serviceInfo.slots === 0) {
        throw new APIError_1.default(404, "service unavailable");
    }
    // userInfo check
    const userInfo = yield userModel_1.User.findOne({
        _id: new mongoose_1.default.Types.ObjectId(data === null || data === void 0 ? void 0 : data.client),
    });
    if (!userInfo) {
        throw new APIError_1.default(404, "User not found");
    }
    if (userInfo.role !== "client") {
        throw new APIError_1.default(404, "order not possible for this user Role");
    }
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const orderCount = yield orderModel_1.Order.countDocuments({
        services: serviceInfo === null || serviceInfo === void 0 ? void 0 : serviceInfo._id,
        createdAt: { $gte: currentDate },
    });
    if (orderCount >= (serviceInfo === null || serviceInfo === void 0 ? void 0 : serviceInfo.slots)) {
        throw new Error("No available slots for this service on the current day");
    }
    // order create
    const orderObject = {
        services: serviceInfo === null || serviceInfo === void 0 ? void 0 : serviceInfo._id,
        client: userInfo === null || userInfo === void 0 ? void 0 : userInfo._id,
        status: data === null || data === void 0 ? void 0 : data.status,
    };
    const newOrder = yield orderModel_1.Order.create(orderObject);
    if (!newOrder) {
        throw new APIError_1.default(404, "Failed to create order");
    }
    const result = yield orderModel_1.Order.findOne({
        _id: new mongoose_1.default.Types.ObjectId(newOrder === null || newOrder === void 0 ? void 0 : newOrder._id),
    })
        .populate({
        path: "services",
        // select: "-slots",
    })
        .populate({ path: "client", select: "-password" });
    return result;
});
exports.createOrderService = createOrderService;
// get alll
const getAllOrderService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    let userIdAsObjecId = new mongoose_1.default.Types.ObjectId(user === null || user === void 0 ? void 0 : user._id);
    //  for admin
    if (((user === null || user === void 0 ? void 0 : user.role) === "admin" && (user === null || user === void 0 ? void 0 : user.service) === "user-management") ||
        (user === null || user === void 0 ? void 0 : user.role) === "super-admin") {
        result = yield orderModel_1.Order.find({})
            .populate({
            path: "services",
            select: "-slots",
        })
            .populate({ path: "client", select: "-password" });
    }
    // for buyer
    else if ((user === null || user === void 0 ? void 0 : user.role) === "client") {
        const exists = yield orderModel_1.Order.aggregate([
            { $match: { client: userIdAsObjecId } },
            {
                $lookup: {
                    from: serviceModel_1.Service.collection.name,
                    localField: "services",
                    foreignField: "_id",
                    as: "services",
                },
            },
            {
                $lookup: {
                    from: userModel_1.User.collection.name,
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
        result = (exists === null || exists === void 0 ? void 0 : exists.length) > 0 ? exists : [];
    }
    return result;
});
exports.getAllOrderService = getAllOrderService;
// single
const getSingleOrderService = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    let userIdAsObjecId = new mongoose_1.default.Types.ObjectId(user === null || user === void 0 ? void 0 : user._id);
    //  for admin
    if (((user === null || user === void 0 ? void 0 : user.role) === "admin" && (user === null || user === void 0 ? void 0 : user.service) === "user-management") ||
        (user === null || user === void 0 ? void 0 : user.role) === "super-admin") {
        result = yield orderModel_1.Order.findOne({
            _id: new mongoose_1.default.Types.ObjectId(id),
        })
            .populate({
            path: "services",
            select: "-slots",
        })
            .populate({ path: "client", select: "-password" });
    }
    // buyer
    else if ((user === null || user === void 0 ? void 0 : user.role) === "client") {
        result = yield orderModel_1.Order.findOne({
            _id: new mongoose_1.default.Types.ObjectId(id),
        })
            .populate({
            path: "services",
            select: "-slots",
        })
            .populate({ path: "client", select: "-password" });
        const { client } = result;
        if (!client.equals(userIdAsObjecId)) {
            throw new APIError_1.default(403, "Forbidden");
        }
    }
    return result;
});
exports.getSingleOrderService = getSingleOrderService;
const deleteOrderService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orderModel_1.Order.findByIdAndDelete({
        _id: new mongoose_1.default.Types.ObjectId(id),
    });
    return result;
});
exports.deleteOrderService = deleteOrderService;
const updateOrderService = (id, payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield orderModel_1.Order.findOne({
        _id: new mongoose_1.default.Types.ObjectId(id),
        // client: new mongoose.Types.ObjectId(user?._id),
    });
    if (!isExist) {
        throw new APIError_1.default(404, "Order not found !");
    }
    const updatedOrderData = Object.assign({}, payload);
    const result = yield orderModel_1.Order.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(id) }, updatedOrderData, {
        new: true,
    });
    return result;
});
exports.updateOrderService = updateOrderService;
