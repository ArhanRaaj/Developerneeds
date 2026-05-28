import { z } from "zod";

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters")
      .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters").max(5000),
  downloadLink: z.string().url("Must be a valid URL"),
  credits: z.string().max(500).optional(),
  categoryId: z.string().min(1, "Category is required"),
  images: z.array(z.string().url()).max(5, "Maximum 5 images").optional(),
});

export const updateProfileSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/)
    .optional(),
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional(),
});

export const roleUpdateSchema = z.object({
  userId: z.string(),
  role: z.enum(["MEMBER", "DROPPER", "ADMIN", "COFOUNDER", "FOUNDER"]),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type RoleUpdateInput = z.infer<typeof roleUpdateSchema>;
