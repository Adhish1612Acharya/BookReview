import { z } from "zod";

export const bookSchemaValidation = z.object({
  title: z
    .string()
    .min(1)
    .max(100)
    .regex(/.*\S.*/),
  description: z
    .string()
    .min(1)
    .max(100)
    .regex(/.*\S.*/),
  price: z.string().regex(/^(?!0+$)\d+$/),
});

export const reviewValidation = z.object({
  rating: z.string().regex(/^[1-5]$/),
  description: z
    .string()
    .min(1)
    .regex(/.*\S.*/),
});

export const signUpFormValidation = z.object({
  username: z.string().regex(/^\S{5,}$/, "Enter a valid username"),
  email: z
    .string()
    .regex(/^[a-zA-Z0-9]+(.[a-zA-Z0-9]+)*@gmail.com$/, "Enter a valid email"),
  password: z.string().regex(/^\S{5,}$/, "Enter a valid password"),
});

export const loginFormValidation = z.object({
  username: z.string().regex(/^\S{5,}$/, "Enter a valid username"),
  password: z.string().regex(/^\S{5,}$/, "Enter a valid password"),
});
