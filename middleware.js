import { cookies } from "next/headers";
import { VerifyUser } from "./utils/verifyUser";

export async function middleware(req) {
  const path = req.nextUrl.pathname;
  const cookie = cookies().get("token");

  if ((path == "/" || path == "/verify") && !cookie) {
    return Response.redirect(new URL("/login", req.url));
  }


  // if (path == "/api/category" && cookie) {
  //   console.log(decode);
  // }
  //   const body = await req.json();
  // console.log(cookieStore.get("token").value);
}

export const config = {
  matcher: ["/api/:path*", "/login", "/signup", "/verify", "/"],
};
