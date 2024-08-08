import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { prisma } from "./libs/prisma/prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
   callbacks: {
      async session({token, session}) {
         if(token.sub && session.user) {
            session.user.id = token.sub;
         }
         return session;
      } 
   },
   adapter: PrismaAdapter(prisma),
   session: { strategy: "jwt" },
   secret: process.env.AUTH_SECRET as string,
   ...authConfig,
});
