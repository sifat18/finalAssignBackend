import { z } from "zod";

const createUserZodSchema = z.object({
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
    phoneNumber: z.number({
      required_error: "phone Number is required",
    }),

    role: z.string({
      required_error: "Role is required",
    }),
    address: z.string().optional(),
    service: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
