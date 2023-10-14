import { z } from "zod";

const createServiceZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "name is required",
    }),

    slots: z.number({
      required_error: "slots is required",
    }),
    serviceType: z.string({
      required_error: "service Type Number number is required",
    }),

    price: z.number({
      required_error: "price is required",
    }),
    description: z.string({
      required_error: "description is required",
    }),
    status: z.string({
      required_error: "status is required",
    }),
  }),
});

export const ServiceValidation = {
  createServiceZodSchema,
};
