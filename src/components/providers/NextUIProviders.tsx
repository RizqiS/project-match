"use client";
import { NextUIProvider } from "@nextui-org/react";
import React, { ReactNode } from "react";

export default function NextUIProviders({
   children,
}: {
   children: Readonly<ReactNode>;
}) {
   return <NextUIProvider>{children}</NextUIProvider>;
}
