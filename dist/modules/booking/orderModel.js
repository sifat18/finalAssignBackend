"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.orderSchema = void 0;
const mongoose_1 = require("mongoose");
const userModel_1 = require("../user/userModel");
const serviceModel_1 = require("../service/serviceModel");
exports.orderSchema = new mongoose_1.Schema({
    services: { type: mongoose_1.Schema.Types.ObjectId, ref: serviceModel_1.Service, required: true },
    client: { type: mongoose_1.Schema.Types.ObjectId, ref: userModel_1.User, required: true },
    status: {
        type: String,
        enum: ["pending", "approved"],
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Order = (0, mongoose_1.model)("Order", exports.orderSchema);
