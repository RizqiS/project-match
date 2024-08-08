import { z } from "zod";

export const loginSchema = z.object({
   email: z.string().min(1, "email is required"),
   password: z
      .string()
      .min(1, "password is required")
      .min(8, "password must be at least 8 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
