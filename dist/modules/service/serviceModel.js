"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = exports.serviceSchema = void 0;
const mongoose_1 = require("mongoose");
exports.serviceSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    serviceType: {
        type: String,
        required: true,
        enum: ["Wash and Fold", "Dry Cleaning", "Ironing and Pressing"],
    },
    price: { type: Number, required: true },
    slots: { type: Number, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: ["active", "upcoming", "inactive"],
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Service = (0, mongoose_1.model)("Service", exports.serviceSchema);
