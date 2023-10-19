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
exports.updateReview = exports.deleteService = exports.singleReview = exports.getAllReviewForAll = exports.getAllReview = exports.createReview = void 0;
const reviewService_1 = require("./reviewService");
const catchAsync_1 = __importDefault(require("../../helpers/catchAsync"));
const responseFormat_1 = __importDefault(require("../../helpers/responseFormat"));
const APIError_1 = __importDefault(require("../../helpers/APIError"));
exports.createReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, reviewService_1.createReviewService)(req.body);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Review created successfully",
        data: result,
    });
}));
// get all
exports.getAllReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const result = yield (0, reviewService_1.getAllReviewService)(_id);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Review retrieved successfully !",
        data: result,
    });
}));
// get all
exports.getAllReviewForAll = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, reviewService_1.getAllReviewServiceForAll)();
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Review retrieved successfully !",
        data: result,
    });
}));
// get 1
exports.singleReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, reviewService_1.getSingleReviewService)(id, req.user);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Review  retrieved successfully",
        data: result,
    });
}));
// delete
exports.deleteService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.service !== "user-management" &&
        req.user.service !== "super-management" &&
        req.user.role !== "client")
        throw new APIError_1.default(401, "UnAuthorized Action !");
    const { id } = req.params;
    const result = yield (0, reviewService_1.deleteReviewService)(id, req.user);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Review deleted successfully",
        data: result,
    });
}));
// update
exports.updateReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = req.body;
    const result = yield (0, reviewService_1.updateReviewService)(id, updatedData, req.user);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Review updated successfully",
        data: result,
    });
}));
