// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   console.log("Cookies:", request.cookies.getAll());

//   const token = request.cookies.get("access_token_cookie")?.value;

//   if (
//     (request.nextUrl.pathname.startsWith("/student") ||
//       request.nextUrl.pathname.startsWith("/admin")) &&
//     !token
//   ) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/student/:path*", "/admin/:path*"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.next();
}