import { z } from "zod";

export const registerSchema = z.object({
   username: z.string().min(1, "username is required"),
   email: z
      .string()
      .email("please enter valid email")
      .min(1, "email is required"),
   password: z
      .string()
      .min(1, "password is required")
      .min(8, "password must be at least 8 characters"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
