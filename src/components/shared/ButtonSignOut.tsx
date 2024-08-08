import React from "react";
import { Button } from "@nextui-org/react";
import { BiLogOut } from "react-icons/bi";
import { signOutUser } from "@/actions/authActions";

export default function ButtonSignOut() {
   return (
      <form action={signOutUser} className="mt-3">
         <Button
            type="submit"
            variant="bordered"
            color="secondary"
            startContent={<BiLogOut />}>
            Sign Out
         </Button>
      </form>
   );
}
