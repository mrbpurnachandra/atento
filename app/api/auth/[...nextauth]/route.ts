import NextAuth, { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },

  // Remember to tune in production
  session: {
    strategy: "jwt",
  },

  callbacks: {
    jwt({ token, account }) {
      if (account) {
        token.idToken = account.id_token;
      }

      return token;
    },

    session({ session, token }) {
      session.token = token.idToken;

      return session;
    },
  },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
