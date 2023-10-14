import { z } from "zod";

const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: "Password is required",
    }),
    name: z.object({
      firstName: z.string({
        required_error: "First name is required",
      }),
      lastName: z.string({
        required_error: "Last name is required",
      }),
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    phoneNumber: z.string({
      required_error: "Phone number is required",
    }),
    service: z.string({
      required_error: "service is required",
    }),
    role: z.string({
      required_error: "role is required",
    }),

    address: z.string().optional(),
  }),
});

export const AdminValidation = {
  createAdminZodSchema,
};
