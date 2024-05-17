import { NextResponse } from "next/server";
import { getSession } from "./lib/session";

export async function middleware(request) {
  const session = await getSession();

  if (request.nextUrl.pathname.startsWith("/login") && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/registrieren") && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
