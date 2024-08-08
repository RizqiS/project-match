"use client";
import React from "react";
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { GiPadlock } from "react-icons/gi";
import { registerSchema, RegisterSchema } from "@/libs/zod/registerSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/actions/authActions";
import { toast } from "react-toastify";
export default function RegisterForm() {
   const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isValid, isSubmitting },
   } = useForm<RegisterSchema>({
      mode: "onTouched",
      // resolver: zodResolver(registerSchema),
   });

   const onSubmitHandler = async (data: RegisterSchema) => {
      const results = await registerUser(data);
      if (results.status === "error") {
         if (Array.isArray(results.error)) {
            results.error.forEach((e) => {
               const fieldsname = e.path.join(" ") as
                  | "email"
                  | "password"
                  | "username";
               setError(fieldsname, { message: e.message });
            });
         } else {
            setError("root.serverError", { message: results.error });
         }
         return;
      }
      toast.success("user register success");
   };

   return (
      <Card className="w-2/5 mx-auto">
         <CardHeader className="flex flex-col items-center justify-center">
            <div className="flex flex-col gap-2 items-center text-secondary">
               <div className="flex flex-row items-center gap-3">
                  <GiPadlock size={30} />
                  <h1 className="text-3xl font-semibold">Register</h1>
               </div>
               <p className="text-neutral-500">
                  Register new Account to NexthMatch
               </p>
            </div>
         </CardHeader>
         <CardBody>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
               <div className="space-y-4">
                  <Input
                     label="Username"
                     type="text"
                     aria-label="username"
                     variant="bordered"
                     isInvalid={!!errors.username}
                     errorMessage={errors.username?.message as string}
                     defaultValue=""
                     {...register("username")}
                  />
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
                  {errors.root?.serverError && (
                     <p className="text-danger text-sm">
                        {errors.root.serverError.message}
                     </p>
                  )}
                  <Button
                     isLoading={isSubmitting}
                     isDisabled={!isValid}
                     fullWidth
                     color="secondary"
                     type="submit">
                     Register Account
                  </Button>
               </div>
            </form>
         </CardBody>
      </Card>
   );
}
