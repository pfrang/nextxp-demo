// pages/api/auth/[...nextauth].ts
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { RequestInternal } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {

  return await NextAuth(req, res, {
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          return {
            ...token,
            user,
          };
        }
        return token;
      },

      async session({ session, token }) {
        session.user = token.user as any

        return session;
      },

      async redirect({ url, baseUrl }) {
        return "/"
      },
    },
    pages: {
      signIn: "/logg-inn",
    },
    providers: [
      CredentialsProvider({
        // The name to display on the sign-in form (e.g., 'Sign in with...')
        name: 'Credentials',
        credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied
          const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' }

          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return Promise.resolve(user)
          } else {
            // If you return null or false then the credentials will be rejected
            return Promise.resolve(null)
            // You can also Reject this callback with an Error or with a URL:
            // return Promise.reject(new Error('error message')) // Redirect to error page
            // return Promise.reject('/path/to/redirect')        // Redirect to a URL
          }
        }
      })
    ],
  })
}
