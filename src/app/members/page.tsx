import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

export default function MembersPage() {
   return (
      <div>
         <Button as={Link} href="/" variant="bordered" color="secondary">
            Go back
         </Button>
      </div>
   );
}
