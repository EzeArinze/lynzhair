import { z } from "zod";

const allowedDomains = [
  "gmail.com",
  "outlook.com",
  "hotmail.com",
  "yahoo.com",
  "icloud.com",
];

export const siginUpSchema = z
  .object({
    username: z
      .string()
      .min(1, "Username is required")
      .max(20, "Max 20 characters"),
    email: z
      .string()
      .email("Invalid email format")
      .refine(
        (email) => {
          const domain = email.split("@")[1];
          return allowedDomains.includes(domain.toLowerCase());
        },
        {
          message:
            "Please use a valid email provider (Gmail, Outlook, Hotmail, Yahoo, or iCloud)",
        }
      ),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(8, "Password must not exceed 8 characters")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

//Product schema
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
