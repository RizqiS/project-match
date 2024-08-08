"use server";

import { auth } from "@/auth";
import { prisma } from "@/libs/prisma/prisma";
import { Photo } from "@prisma/client";

export async function getMembers() {
   const session = await auth();
   if (!session?.user) return null;

   try {
      return prisma.member.findMany({
         where: {
            NOT: {
               userId: session.user.id,
            },
         },
      });
   } catch (error) {
      console.log(error);
      throw error;
   }
}

export async function getMemberByUserId(userId: string) {
   try {
      const memberByUserid = await prisma.member.findUnique({
         where: { userId: userId },
      });
      if (!memberByUserid) {
         throw new Error("member by user id not found");
      }
      return memberByUserid;
   } catch (error) {
      console.log(error);
      throw error;
   }
}

export async function getMemberPhotoByUserId(userId: string) {
   try {
      const member = await prisma.member.findUnique({
         where: { userId },
         select: {
            photo: true,
         },
      });

      if (!member) return null;

      return member.photo.map((p) => p) as Photo[];
   } catch (error) {
      console.log(error);
   }
}
