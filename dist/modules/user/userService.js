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
exports.deleteUserService = exports.updateUserService = exports.getSingleUserService = exports.getAllUserService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = require("./userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const APIError_1 = __importDefault(require("../../helpers/APIError"));
const paginationHelper_1 = require("../../helpers/paginationHelper");
const pick_1 = require("../../helpers/pick");
// getting all
const getAllUserService = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelper_1.calculatePagination)(paginationOptions);
    const andConditions = [];
    // search
    if (searchTerm) {
        andConditions.push({
            $or: pick_1.userSearchableFields.map((field) => ({
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
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield userModel_1.User.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const count = yield userModel_1.User.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            count,
        },
        data: result,
    };
});
exports.getAllUserService = getAllUserService;
// single
const getSingleUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userModel_1.User.findOne({ _id: new mongoose_1.default.Types.ObjectId(id) }, { password: 0 });
    return result;
});
exports.getSingleUserService = getSingleUserService;
// update
const updateUserService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield userModel_1.User.findOne({ _id: new mongoose_1.default.Types.ObjectId(id) });
    if (!isExist) {
        throw new APIError_1.default(404, "User not found !");
    }
    const { name, password } = payload, userData = __rest(payload, ["name", "password"]);
    let hashPas;
    if (password) {
        hashPas = yield bcrypt_1.default.hash(password, Number(config_1.default.bycrypt_salt_rounds));
    }
    const updatedUserData = Object.assign({}, userData);
    if (hashPas) {
        updatedUserData["password"] = hashPas;
    }
    // dynamically handling
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}`;
            updatedUserData[nameKey] = name[key];
        });
    }
    const result = yield userModel_1.User.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(id) }, updatedUserData, {
        new: true,
    });
    return result;
});
exports.updateUserService = updateUserService;
// delete
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userModel_1.User.findByIdAndDelete({
        _id: new mongoose_1.default.Types.ObjectId(id),
    });
    return result;
});
exports.deleteUserService = deleteUserService;
