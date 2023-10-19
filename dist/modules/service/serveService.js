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
exports.serviceDelete = exports.serviceUpdate = exports.singleGetService = exports.getServiceAll = exports.serviceCreate = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const APIError_1 = __importDefault(require("../../helpers/APIError"));
const serviceModel_1 = require("./serviceModel");
const paginationHelper_1 = require("../../helpers/paginationHelper");
const pick_1 = require("../../helpers/pick");
const orderModel_1 = require("../booking/orderModel");
const serviceCreate = (service) => __awaiter(void 0, void 0, void 0, function* () {
    const createdService = yield serviceModel_1.Service.create(service);
    if (!createdService) {
        throw new APIError_1.default(400, "failed to create Service");
    }
    return createdService;
});
exports.serviceCreate = serviceCreate;
// getting all
const getServiceAll = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, maxPrice, minPrice } = filters, filtersData = __rest(filters, ["searchTerm", "maxPrice", "minPrice"]);
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelper_1.calculatePagination)(paginationOptions);
    const andConditions = [];
    // search
    if (searchTerm) {
        andConditions.push({
            $or: pick_1.serviceSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    // filter field
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $or: Object.entries(filtersData).map(([field, value]) => ({
                [field]: {
                    $regex: value,
                    $options: "i",
                },
            })),
        });
    }
    if (maxPrice) {
        andConditions.push({
            price: {
                $lte: Number(maxPrice),
            },
        });
    }
    if (minPrice) {
        andConditions.push({
            price: {
                $gte: Number(minPrice),
            },
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield serviceModel_1.Service.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const count = yield serviceModel_1.Service.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            count,
        },
        data: result,
    };
});
exports.getServiceAll = getServiceAll;
// single
const singleGetService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield serviceModel_1.Service.findOne({
        _id: new mongoose_1.default.Types.ObjectId(id),
    });
    return result;
});
exports.singleGetService = singleGetService;
// update
const serviceUpdate = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield serviceModel_1.Service.findOne({
        _id: new mongoose_1.default.Types.ObjectId(id),
    });
    if (!isExist) {
        throw new APIError_1.default(404, "Service not found !");
    }
    const serviceData = __rest(payload, []);
    const updatedServiceData = Object.assign({}, serviceData);
    const result = yield serviceModel_1.Service.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(id) }, updatedServiceData, {
        new: true,
    });
    return result;
});
exports.serviceUpdate = serviceUpdate;
// delete
const serviceDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield orderModel_1.Order.aggregate([{ $match: { services: id } }]);
    if ((isExist === null || isExist === void 0 ? void 0 : isExist.length) > 0) {
        throw new APIError_1.default(400, "Service Cant be deleted as It is booked !");
    }
    const result = yield serviceModel_1.Service.findByIdAndDelete({
        _id: new mongoose_1.default.Types.ObjectId(id),
    });
    return result;
});
exports.serviceDelete = serviceDelete;
