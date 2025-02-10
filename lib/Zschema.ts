import { z } from "zod";

export const schema = z
  .object({
    username: z
      .string()
      .min(1, "Username is required")
      .max(20, "Max 20 characters"),
    email: z
      .string()
      .email("Invalid email format or provide your email")
      .max(40, "Max 40 characters"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(8, "Max 8 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters")
      .max(8, "Max 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
