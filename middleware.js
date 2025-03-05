import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname === "/blog") {
    return NextResponse.redirect(new URL("/blogs", request.url));
  }
  return NextResponse.next(); 
}
