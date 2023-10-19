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
exports.Admin = exports.adminSchema = void 0;
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.adminSchema = new mongoose_1.Schema({
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "super-admin"],
    },
    address: {
        type: String,
    },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    service: {
        type: String,
        enum: ["user-management", "content-management", "super-management"],
        required: true,
    },
    phoneNumber: { type: Number, required: true, unique: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.adminSchema.statics.isAdminExist = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.Admin.findOne({ email });
    });
};
exports.adminSchema.statics.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savedPassword);
    });
};
exports.adminSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bycrypt_salt_rounds));
        next();
    });
});
exports.Admin = (0, mongoose_1.model)("Admin", exports.adminSchema);
