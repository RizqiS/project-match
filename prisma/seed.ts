import { PrismaClient } from "@prisma/client";
import { membersData } from "./memberData";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function seedMembers() {
   return membersData.map(async (item) =>
      prisma.user.create({
         data: {
            email: item.email,
            emailVerified: new Date(),
            name: item.name,
            passwordHash: await hash("password", 10),
            image: item.image,
            member: {
               create: {
                  dateOfBirth: new Date(item.dateOfBirth),
                  gender: item.gender,
                  name: item.name,
                  created: new Date(item.created),
                  updated: new Date(item.lastActive),
                  description: item.description,
                  city: item.city,
                  country: item.country,
                  image: item.image,
                  photo: {
                     create: {
                        url: item.image,
                     },
                  },
               },
            },
         },
      })
   );
}

async function main() {
   await seedMembers();
}

main()
   .catch((error) => {
      console.log(error);
      process.exit(1);
   })
   .finally(async () => {
      await prisma.$disconnect();
   });
