import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    token?: string;
    account?: {
      id: number;
      name: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    idToken?: string;
    account?: {
      id: number;
      name: string;
    };
  }
}
