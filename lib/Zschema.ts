import { z } from "zod";

const allowedDomains = [
  "gmail.com",
  "outlook.com",
  "hotmail.com",
  "yahoo.com",
  "icloud.com",
];

// Sign Up form Schema

export const siginUpSchema = z
  .object({
    username: z
      .string()
      .min(1, "Username is required")
      .max(20, "Max 20 characters"),
    email: z
      .string()
      .email("Email is required")
      .refine(
        (email) => {
          try {
            const domain = email.split("@")[1]?.toLowerCase();
            return domain ? allowedDomains.includes(domain) : false;
          } catch {
            return false;
          }
        },
        {
          message:
            "Please use a valid email provider (Gmail, Outlook, Hotmail, Yahoo, or iCloud)",
        }
      ),
    password: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/, {
        message:
          "Password must be 6-8 characters long, contain at least one uppercase letter, one lowercase letter, and one number",
      })
      .min(6, "Password must be at least 6 characters")
      .max(12, "Max password 8 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password Required and must be at least 6 characters")
      .max(12, "Max confirm 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Product form Schema
export const productFormSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(40, "Max 40 characters"),
  category: z
    .string()
    .min(1, "Product category is required")
    .max(20, "Max 20 characters"),
  price: z.number().min(0.01, "Price must be at least 0.01"),
  discount: z.number().optional(),
  stock: z.number().min(0, "Stock must be at least 1"),
  image: z.string().optional(), // File or string,
  description: z.string().min(1, "Product description is required"),
});
