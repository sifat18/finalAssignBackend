"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = exports.ReviewSchema = void 0;
const mongoose_1 = require("mongoose");
const userModel_1 = require("../user/userModel");
const serviceModel_1 = require("../service/serviceModel");
exports.ReviewSchema = new mongoose_1.Schema({
    services: { type: mongoose_1.Schema.Types.ObjectId, ref: serviceModel_1.Service, required: true },
    client: { type: mongoose_1.Schema.Types.ObjectId, ref: userModel_1.User, required: true },
    message: { type: String, required: true },
    rating: { type: Number, required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Review = (0, mongoose_1.model)("Review", exports.ReviewSchema);
