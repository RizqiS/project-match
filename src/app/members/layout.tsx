import React, { ReactNode } from "react";

export default function MembersLayout({
   children,
}: {
   children: Readonly<ReactNode>;
}) {
   return <section>{children}</section>;
}
