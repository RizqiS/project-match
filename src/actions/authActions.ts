"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/libs/prisma/prisma";
import { loginSchema, LoginSchema } from "@/libs/zod/loginSchema";
import { registerSchema, RegisterSchema } from "@/libs/zod/registerSchema";
import { ActionResult } from "@/types";
import { User } from "@prisma/client";
import bcryptjs from "bcryptjs";
import { AuthError } from "next-auth";

export async function registerUser(
   data: RegisterSchema
): Promise<ActionResult<User>> {
   try {
      const validated = registerSchema.safeParse(data);
      if (!validated.success)
         return { status: "error", error: validated.error.errors };

      const { username, email, password } = validated.data;
      const hashedPassword = await bcryptjs.hash(password, 10);

      const existingUser = await prisma.user.findUnique({
         where: { email },
      });

      if (existingUser)
         return { status: "error", error: "user already exists" };

      const usersResult = await prisma.user.create({
         data: {
            name: username,
            passwordHash: hashedPassword,
            email,
         },
      });

      return { status: "success", data: usersResult };
   } catch (error) {
      console.log(error);
      return { status: "error", error: "something went wrong" };
   }
}

export async function signInUser(
   data: LoginSchema
): Promise<ActionResult<string>> {
   try {
      const validated = loginSchema.safeParse(data);
      if (!validated.success) {
         return { status: "error", error: validated.error.errors };
      }

      const result = await signIn("credentials", {
         email: data.email,
         password: data.password,
         redirect: false,
      });

      console.log(result);
      return { status: "success", data: "logged in success" };
   } catch (error) {
      console.log(error);
      if (error instanceof AuthError) {
         switch (error.type) {
            case "CredentialsSignin":
               return { status: "error", error: "Invalid credentials" };
            default:
               return {
                  status: "error",
                  error: "Invalid credentials between email or password",
               };
         }
      } else {
         return { status: "error", error: "something went wrong 2" };
      }
   }
}

export async function signOutUser() {
   await signOut({redirectTo: "/"});
}

export async function getUserByEmail(email: string) {
   return prisma.user.findUnique({
      where: { email },
   });
}

export async function getUserById(id: string) {
   return prisma.user.findUnique({
      where: { id },
   });
}
