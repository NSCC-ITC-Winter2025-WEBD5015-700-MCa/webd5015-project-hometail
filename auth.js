import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

class MissingCredentialsError extends CredentialsSignin {
  code = "MissingCredentials";
}

class UserNotFoundError extends CredentialsSignin {
  code = "UserNotFound";
}

class InvalidPasswordError extends CredentialsSignin {
  code = "InvalidPassword";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new MissingCredentialsError();
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            throw new UserNotFoundError();
          }

          const isPasswordCorrect = await bcryptjs.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new InvalidPasswordError();
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            isSubscribed: user.isSubscribed,
            role: user.role,
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true;
      }
      if (account?.provider === "google" || account?.provider === "apple") {
        try {
          let existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });

          if (!existingUser) {
            existingUser = await prisma.user.create({
              data: {
                email: user.email,
                isSubscribed: false,
                name: user.name || "",
                role: "user",
              },
            });
          }
          user.id = existingUser.id;
          user.isSubscribed = existingUser.isSubscribed;
          user.name = existingUser.name || user.name;
          user.role = existingUser.role;

          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return false;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
          isSubscribed: user.isSubscribed,
          role: user.role,
        };
      } else if (trigger === "update" && session) {
        token.name = session.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.isSubscribed = token.isSubscribed;
      session.user.role = token.role;

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});
