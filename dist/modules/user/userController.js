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
exports.deleteUser = exports.updateUser = exports.updateUserProfile = exports.getProfile = exports.getSingleUser = exports.getAllUser = void 0;
const userService_1 = require("./userService");
const catchAsync_1 = __importDefault(require("../../helpers/catchAsync"));
const responseFormat_1 = __importDefault(require("../../helpers/responseFormat"));
const APIError_1 = __importDefault(require("../../helpers/APIError"));
const pick_1 = require("../../helpers/pick");
// all user
exports.getAllUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.service !== "user-management" &&
        req.user.service !== "super-management")
        throw new APIError_1.default(401, "UnAuthorized Action !");
    const filters = (0, pick_1.pick)(req.query, pick_1.userFilterableFields);
    const paginationOptions = (0, pick_1.pick)(req.query, pick_1.paginationFields);
    const result = yield (0, userService_1.getAllUserService)(filters, paginationOptions);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Users retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
}));
// single user
exports.getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.service !== "user-management" &&
        req.user.service !== "super-management")
        throw new APIError_1.default(401, "UnAuthorized Action !");
    const { id } = req.params;
    const result = yield (0, userService_1.getSingleUserService)(id);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User retrieved successfully",
        data: result,
    });
}));
// single user profile
exports.getProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (req.user.service !== "user-management" &&
        req.user.service !== "super-management" &&
        req.user.role !== "client")
        throw new APIError_1.default(401, "UnAuthorized Action !");
    const result = yield (0, userService_1.getSingleUserService)((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User's information retrieved successfully",
        data: result,
    });
}));
// update profile
exports.updateUserProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    // const { id } = req.params;
    const updatedData = req.body;
    const result = yield (0, userService_1.updateUserService)((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id, updatedData);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User updated successfully",
        data: result,
    });
}));
// update
exports.updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.service !== "user-management" &&
        req.user.service !== "super-management")
        throw new APIError_1.default(401, "UnAuthorized Action !");
    const { id } = req.params;
    const updatedData = req.body;
    const result = yield (0, userService_1.updateUserService)(id, updatedData);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User updated successfully",
        data: result,
    });
}));
// delete
exports.deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.service !== "user-management" &&
        req.user.service !== "super-management")
        throw new APIError_1.default(401, "UnAuthorized Action !");
    const { id } = req.params;
    const result = yield (0, userService_1.deleteUserService)(id);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User deleted successfully",
        data: result,
    });
}));
