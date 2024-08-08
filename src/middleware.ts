import { NextResponse } from "next/server";
import { auth } from "./auth";
import { authRoutes, publicRoutes } from "./routes";

export default auth((req) => {
   const { nextUrl } = req;
   const isLoggedIn = !!req.auth;

   const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
   const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

   if (isPublicRoutes) {
      return NextResponse.next();
   }

   if (isAuthRoutes) {
      if (isLoggedIn) {
         return NextResponse.redirect(new URL("/members", nextUrl));
      }
      return NextResponse.next();
   }

   if (!isPublicRoutes && !isLoggedIn) {
      return NextResponse.redirect(new URL("/login", nextUrl));
   }

   return NextResponse.next();
});

export const config = {
   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
