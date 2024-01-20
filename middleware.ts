export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/((?!auth/signin|_next/static|_next/image|favicon.ico).*)"],
};
