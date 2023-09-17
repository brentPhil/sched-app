import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"

import type { NextRequest } from "next/server"
import { Database } from "./types/supabase"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  await supabase.auth.getSession()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("id", user?.id ?? "")
    .single()

  const urlRoleCheck = data?.role === "admin" ? "/dashboard" : "/faculty"

  // if user is signed in and the current path is / redirect the user to /account
  if (user && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(urlRoleCheck, req.url))
  }

  if (data?.role === "admin" && req.nextUrl.pathname === "/faculty/:path*") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  if (
    data?.role === "faculty" &&
    req.nextUrl.pathname === "/dashboard/:path*"
  ) {
    return NextResponse.redirect(new URL("/faculty", req.url))
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return res
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/faculty/:path*"],
}
