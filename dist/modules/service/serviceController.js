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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteService = exports.updateService = exports.getSingleService = exports.getAllService = exports.createService = void 0;
const serveService_1 = require("./serveService");
const catchAsync_1 = __importDefault(require("../../helpers/catchAsync"));
const responseFormat_1 = __importDefault(require("../../helpers/responseFormat"));
const APIError_1 = __importDefault(require("../../helpers/APIError"));
const pick_1 = require("../../helpers/pick");
exports.createService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.service !== "content-management" &&
        req.user.service !== "super-management") {
        throw new APIError_1.default(401, "UnAuthorized Action !");
    }
    const serviceData = __rest(req.body, []);
    const result = yield (0, serveService_1.serviceCreate)(serviceData);
    (0, responseFormat_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Service created successfully !",
        data: result,
    });
}));
// all user
exports.getAllService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.service !== "content-management" &&
        req.user.service !== "super-management" &&
        req.user.role !== "client") {
        throw new APIError_1.default(401, "UnAuthorized Action !");
    }
    const filters = (0, pick_1.pick)(req.query, pick_1.serviceFilterableFields);
    const paginationOptions = (0, pick_1.pick)(req.query, pick_1.paginationFields);
    const result = yield (0, serveService_1.getServiceAll)(filters, paginationOptions);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Services retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
}));
// single user
exports.getSingleService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.service !== "content-management" &&
        req.user.service !== "super-management") {
        throw new APIError_1.default(401, "UnAuthorized Action !");
    }
    const { id } = req.params;
    const result = yield (0, serveService_1.singleGetService)(id);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Service retrieved successfully",
        data: result,
    });
}));
// update
exports.updateService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.service !== "content-management" &&
        req.user.service !== "super-management") {
        throw new APIError_1.default(401, "UnAuthorized Action !");
    }
    const { id } = req.params;
    const updatedData = req.body;
    const result = yield (0, serveService_1.serviceUpdate)(id, updatedData);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Service updated successfully",
        data: result,
    });
}));
// delete
exports.deleteService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.service !== "content-management" &&
        req.user.service !== "super-management") {
        throw new APIError_1.default(401, "UnAuthorized Action !");
    }
    const { id } = req.params;
    const result = yield (0, serveService_1.serviceDelete)(id);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Service deleted successfully",
        data: result,
    });
}));
