"use client";
import { signInUser } from "@/actions/authActions";
import { LoginSchema, loginSchema } from "@/libs/zod/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { toast } from "react-toastify";

export default function LoginForm() {
   const rouuter = useRouter();
   const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isValid, isSubmitting },
   } = useForm<LoginSchema>({
      mode: "onTouched",
      // resolver: zodResolver(loginSchema),
   });

   const onSubmitHandler = async (data: LoginSchema) => {
      const results = await signInUser(data);
      if (results.status === "error") {
         if (Array.isArray(results.error)) {
            results.error.forEach((e) => {
               const fieldsname = e.path.join("") as "email" | "password";
               setError(fieldsname, { message: e.message });
            });
         }
         toast.error(results.error as string);
      } else {
         rouuter.push("/members");
         rouuter.refresh();
      }
   };

   return (
      <Card className="w-2/5 mx-auto">
         <CardHeader className="flex flex-col items-center justify-center">
            <div className="flex flex-col gap-2 items-center text-secondary">
               <div className="flex flex-row items-center gap-3">
                  <GiPadlock size={30} />
                  <h1 className="text-3xl font-semibold">Login</h1>
               </div>
               <p className="text-neutral-500">Welcome back to NexthMatch</p>
            </div>
         </CardHeader>
         <CardBody>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
               <div className="space-y-4">
                  <Input
                     label="Email"
                     type="email"
                     aria-label="email"
                     variant="bordered"
                     isInvalid={!!errors.email}
                     errorMessage={errors.email?.message as string}
                     defaultValue=""
                     {...register("email")}
                  />
                  <Input
                     label="Password"
                     type="password"
                     aria-label="password"
                     variant="bordered"
                     isInvalid={!!errors.password}
                     errorMessage={errors.password?.message as string}
                     defaultValue=""
                     {...register("password")}
                  />
                  <Button
                     isLoading={isSubmitting}
                     isDisabled={!isValid}
                     fullWidth
                     color="secondary"
                     type="submit">
                     Login
                  </Button>
               </div>
            </form>
         </CardBody>
      </Card>
   );
}
