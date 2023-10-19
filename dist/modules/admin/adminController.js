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
exports.deleteAdmin = exports.updateAdmin = exports.getSingleAdmin = exports.getAllAdmin = exports.createAdmin = void 0;
const adminService_1 = require("./adminService");
const catchAsync_1 = __importDefault(require("../../helpers/catchAsync"));
const responseFormat_1 = __importDefault(require("../../helpers/responseFormat"));
exports.createAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const adminData = __rest(req.body, []);
    const result = yield (0, adminService_1.createAdminService)(adminData);
    let dataWithoutPass;
    if (result) {
        const _a = result === null || result === void 0 ? void 0 : result._doc, { password } = _a, rest = __rest(_a, ["password"]);
        dataWithoutPass = rest;
    }
    (0, responseFormat_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Admin created successfully !",
        data: dataWithoutPass,
    });
}));
// all user
exports.getAllAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, adminService_1.getAllAdminService)();
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Admin retrieved successfully",
        data: result,
    });
}));
// single user
exports.getSingleAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, adminService_1.getSingleAdminService)(id);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Admin retrieved successfully",
        data: result,
    });
}));
// update
exports.updateAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = req.body;
    const result = yield (0, adminService_1.updateAdminService)(id, updatedData);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Admin updated successfully",
        data: result,
    });
}));
// delete
exports.deleteAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, adminService_1.deleteAdminService)(id);
    (0, responseFormat_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Admin deleted successfully",
        data: result,
    });
}));
