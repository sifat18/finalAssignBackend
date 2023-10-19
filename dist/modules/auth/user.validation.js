"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
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
        phoneNumber: zod_1.z.number({
            required_error: "phone Number is required",
        }),
        role: zod_1.z.string({
            required_error: "Role is required",
        }),
        address: zod_1.z.string().optional(),
        service: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
};
