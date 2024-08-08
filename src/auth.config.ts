import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "./libs/zod/loginSchema";
import { getUserByEmail } from "./actions/authActions";
import { compare } from "bcryptjs";

export default {
   providers: [
      GitHub,
      Credentials({
         name: "credentials",
         async authorize(creds) {
            const validated = loginSchema.safeParse(creds);
            if (validated.success) {
               const { email, password } = validated.data;
               const user = await getUserByEmail(email);

               if (!user || !(await compare(password, user.passwordHash)))
                  return null;

               return user;
            }
            return null;
         },
      }),
   ],
} satisfies NextAuthConfig;
