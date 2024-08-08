"use client";
import {
   Button,
   Card,
   CardBody,
   CardFooter,
   CardHeader,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { BiSolidError } from "react-icons/bi";

type Props = {
   error: Error & { disgest?: string };
   reset(): void;
};

export default function Error({ error, reset }: Props) {
   const router = useRouter();

   const backMemberClick = () => {
      router.replace("/members");
   };
   return (
      <div className="flex justify-center items-center vertical">
         <Card className="w-2/5 mx-auto">
            <CardHeader className="flex flex-col justify-center items-center">
               <div className="flex gap-2 items-center text-secondary">
                  <BiSolidError size={30} />
                  <h1 className="text-3xl font-semibold">Error</h1>
               </div>
            </CardHeader>
            <CardBody>
               <div className="flex justify-center text-danger">
                  {error.message}
               </div>
            </CardBody>
            <CardFooter className="flex justify-between">
               <Button
                  variant="bordered"
                  color="secondary"
                  onClick={() => reset()}>
                  Try Again
               </Button>
               <Button
                  onClick={backMemberClick}
                  variant="bordered"
                  color="secondary">
                  Back To Members
               </Button>
            </CardFooter>
         </Card>
      </div>
   );
}
