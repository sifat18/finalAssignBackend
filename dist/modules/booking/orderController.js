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
exports.updateOrder = exports.deleteService = exports.singleOrder = exports.getAllOrders = exports.createOrder = void 0;
const orderService_1 = require("./orderService");
const catchAsync_1 = __importDefault(require("../../helpers/catchAsync"));
const responseFormat_1 = __importDefault(require("../../helpers/responseFormat"));
const APIError_1 = __importDefault(require("../../helpers/APIError"));
exports.createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, orderService_1.createOrderService)(req.body);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Order created successfully",
        data: result,
    });
}));
// get all
exports.getAllOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, orderService_1.getAllOrderService)(req.user);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Orders retrieved successfully !",
        data: result,
    });
}));
// get 1
exports.singleOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, orderService_1.getSingleOrderService)(id, req.user);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Order information retrieved successfully",
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
    const result = yield (0, orderService_1.deleteOrderService)(id);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Order deleted successfully",
        data: result,
    });
}));
// update
exports.updateOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = req.body;
    const result = yield (0, orderService_1.updateOrderService)(id, updatedData, req.user);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Order updated successfully",
        data: result,
    });
}));
