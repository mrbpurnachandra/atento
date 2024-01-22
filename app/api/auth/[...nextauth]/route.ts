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
    async jwt({ token, account }) {
      if (account) {
        token.idToken = account.id_token;
      }

      // Check if the logged in oauth account has corresponding account in our service
      if (!token.account) {
        if (token.idToken) {
          try {
            const response = await fetch(process.env.ACCOUNT_SERVICE + "/me", {
              headers: {
                Authorization: "Bearer " + token.idToken,
              },
            });

            if (response.ok) {
              token.account = await response.json();
            }
          } catch (error) {
            console.log(error);
          }
        }
      }

      return token;
    },

    session({ session, token }) {
      session.token = token.idToken;
      session.account = token.account;

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
