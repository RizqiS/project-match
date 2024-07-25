"use client";

import { NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavItem({
   href,
   name,
}: {
   href: string;
   name: string;
}) {
   const pathname = usePathname();
   return (
      <>
         <NavbarItem as={Link} href={href} isActive={pathname === href}>
            {name}
         </NavbarItem>
      </>
   );
}
