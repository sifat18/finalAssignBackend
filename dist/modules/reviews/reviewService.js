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
exports.getAllReviewServiceForAll = exports.updateReviewService = exports.deleteReviewService = exports.getSingleReviewService = exports.getAllReviewService = exports.createReviewService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = require("../user/userModel");
const serviceModel_1 = require("../service/serviceModel");
const APIError_1 = __importDefault(require("../../helpers/APIError"));
const reviewModel_1 = require("./reviewModel");
const createReviewService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceInfo = yield serviceModel_1.Service.findOne({
        _id: new mongoose_1.default.Types.ObjectId(data === null || data === void 0 ? void 0 : data.services),
    });
    //  info check
    if (!serviceInfo) {
        throw new APIError_1.default(404, "service not found");
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
    const newOrder = yield reviewModel_1.Review.create(data);
    if (!newOrder) {
        throw new APIError_1.default(404, "Failed to create review");
    }
    return newOrder;
});
exports.createReviewService = createReviewService;
// get alll
const getAllReviewService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = reviewModel_1.Review.aggregate([
        {
            $match: {
                client: new mongoose_1.default.Types.ObjectId(id),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "client",
                foreignField: "_id",
                as: "client",
            },
        },
        {
            $lookup: {
                from: "services",
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
});
exports.getAllReviewService = getAllReviewService;
// single
const getSingleReviewService = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    let userIdAsObjecId = new mongoose_1.default.Types.ObjectId(user === null || user === void 0 ? void 0 : user._id);
    //  for admin
    if (((user === null || user === void 0 ? void 0 : user.role) === "admin" && (user === null || user === void 0 ? void 0 : user.service) === "user-management") ||
        (user === null || user === void 0 ? void 0 : user.role) === "super-admin") {
        result = yield reviewModel_1.Review.findOne({
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
        result = yield reviewModel_1.Review.findOne({
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
exports.getSingleReviewService = getSingleReviewService;
const deleteReviewService = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (user.role === "client") {
        result = yield reviewModel_1.Review.findByIdAndDelete({
            _id: new mongoose_1.default.Types.ObjectId(id),
            client: new mongoose_1.default.Types.ObjectId(user === null || user === void 0 ? void 0 : user._id),
        });
    }
    else {
        result = yield reviewModel_1.Review.findByIdAndDelete({
            _id: new mongoose_1.default.Types.ObjectId(id),
        });
    }
    return result;
});
exports.deleteReviewService = deleteReviewService;
const updateReviewService = (id, payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield reviewModel_1.Review.findOne({
        _id: new mongoose_1.default.Types.ObjectId(id),
        client: new mongoose_1.default.Types.ObjectId(user === null || user === void 0 ? void 0 : user._id),
    });
    if (!isExist) {
        throw new APIError_1.default(404, "Review not found !");
    }
    const updatedReviewData = Object.assign({}, payload);
    const result = yield reviewModel_1.Review.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(id) }, updatedReviewData, {
        new: true,
    });
    return result;
});
exports.updateReviewService = updateReviewService;
// get alll
const getAllReviewServiceForAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = reviewModel_1.Review.find({})
        .populate({
        path: "services",
    })
        .populate({
        path: "client",
    });
    return result;
});
exports.getAllReviewServiceForAll = getAllReviewServiceForAll;
