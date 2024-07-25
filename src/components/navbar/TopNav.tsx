import {
   Button,
   Navbar,
   NavbarBrand,
   NavbarContent,
   NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { GiMatchTip } from "react-icons/gi";
import NavItem from "./NavItem";

export default function TopNav() {
   return (
      <Navbar
         maxWidth="xl"
         className="bg-gradient-to-r from-purple-400 to-purple-700"
         classNames={{
            item: [
               "text-white",
               "text-xl",
               "uppercase",
               "data-[active=true]:text-yellow-200",
            ],
         }}>
         <NavbarBrand as={Link} href={"/"}>
            <GiMatchTip size={40} className="text-gray-200" />
            <div className="flex font-bold text-3xl">
               <span className="text-gray-900">Next</span>
               <span className="text-gray-200">Macth</span>
            </div>
         </NavbarBrand>
         <NavbarContent justify="center">
            <NavItem href="/members" name="Matches" />
            <NavItem href="/lists" name="Lists" />
            <NavItem href="/messages" name="Messages" />
         </NavbarContent>
         <NavbarContent justify="end">
            <Button variant="bordered" className="text-white">
               Login
            </Button>
            <Button variant="bordered" className="text-white">
               Register
            </Button>
         </NavbarContent>
      </Navbar>
   );
}
