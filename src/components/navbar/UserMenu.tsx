"use client";

import { signOutUser } from "@/actions/authActions";
import { Session } from "next-auth";
import React from "react";
import Link from "next/link";
import {
   Avatar,
   Dropdown,
   DropdownItem,
   DropdownMenu,
   DropdownSection,
   DropdownTrigger,
} from "@nextui-org/react";

type Props = {
   user: Session["user"];
};

export default function UserMenu({ user }: Props) {
   return (
      <Dropdown placement="bottom-end">
         <DropdownTrigger>
            <Avatar
               isBordered
               as="button"
               className="transition-transform"
               color="secondary"
               name={user?.name || "user avatar"}
               src={user?.image || "/images/user.png"}
            />
         </DropdownTrigger>

         <DropdownMenu variant="flat" aria-label="user action menu">
            <DropdownSection showDivider>
               <DropdownItem
                  isReadOnly
                  as="span"
                  className="h-14 flex flex-row"
                  aria-label="username">
                  Signed as {user?.name}
               </DropdownItem>
            </DropdownSection>

            <DropdownItem as={Link} href="/members/edit">
               Edit Profile
            </DropdownItem>

            <DropdownItem color="danger" onClick={async () => signOutUser()}>
               Log Out
            </DropdownItem>
         </DropdownMenu>
      </Dropdown>
   );
}
