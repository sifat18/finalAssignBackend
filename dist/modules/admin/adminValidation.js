"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "First name is required",
            }),
            lastName: zod_1.z.string({
                required_error: "Last name is required",
            }),
        }),
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email(),
        phoneNumber: zod_1.z.string({
            required_error: "Phone number is required",
        }),
        service: zod_1.z.string({
            required_error: "service is required",
        }),
        role: zod_1.z.string({
            required_error: "role is required",
        }),
        address: zod_1.z.string().optional(),
    }),
});
exports.AdminValidation = {
    createAdminZodSchema,
};
