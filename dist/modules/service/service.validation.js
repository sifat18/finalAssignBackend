"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidation = void 0;
const zod_1 = require("zod");
const createServiceZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "name is required",
        }),
        slots: zod_1.z.number({
            required_error: "slots is required",
        }),
        serviceType: zod_1.z.string({
            required_error: "service Type Number number is required",
        }),
        price: zod_1.z.number({
            required_error: "price is required",
        }),
        description: zod_1.z.string({
            required_error: "description is required",
        }),
        status: zod_1.z.string({
            required_error: "status is required",
        }),
    }),
});
exports.ServiceValidation = {
    createServiceZodSchema,
};
