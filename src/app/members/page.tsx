import { getMembers } from "@/actions/memberActions";
import React from "react";
import MembersCard from "./MembersCard";
import { notFound } from "next/navigation";

export default async function MembersPage() {
   const members = await getMembers();

   return (
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
         {members &&
            members.map((item) => <MembersCard key={item.id} member={item} />)}
      </div>
   );
}
