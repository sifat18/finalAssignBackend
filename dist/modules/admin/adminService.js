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
exports.deleteAdminService = exports.updateAdminService = exports.getSingleAdminService = exports.getAllAdminService = exports.createAdminService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const APIError_1 = __importDefault(require("../../helpers/APIError"));
const userModel_1 = require("../user/userModel");
const adminModel_1 = require("./adminModel");
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// creating user
const createAdminService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const createdAdmin = yield adminModel_1.Admin.create(user);
    const createdUser = yield userModel_1.User.create(user);
    if (!createdUser) {
        throw new APIError_1.default(400, "failed to create Admin");
    }
    if (!createdAdmin) {
        throw new APIError_1.default(400, "failed to create Admin");
    }
    return createdAdmin;
});
exports.createAdminService = createAdminService;
// getting all
const getAllAdminService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adminModel_1.Admin.find({});
    return result;
});
exports.getAllAdminService = getAllAdminService;
// single
const getSingleAdminService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adminModel_1.Admin.findOne({ _id: new mongoose_1.default.Types.ObjectId(id) }, { password: 0 });
    return result;
});
exports.getSingleAdminService = getSingleAdminService;
// update
const updateAdminService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield adminModel_1.Admin.findOne({ _id: new mongoose_1.default.Types.ObjectId(id) });
    if (!isExist) {
        throw new APIError_1.default(404, "Admin not found !");
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
    const result = yield adminModel_1.Admin.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(id) }, updatedUserData, {
        new: true,
    });
    return result;
});
exports.updateAdminService = updateAdminService;
// delete
const deleteAdminService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adminModel_1.Admin.findByIdAndDelete({
        _id: new mongoose_1.default.Types.ObjectId(id),
    });
    return result;
});
exports.deleteAdminService = deleteAdminService;
