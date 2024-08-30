import prisma from "@/libs/prisma";
import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Correo Electronico", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("Credenciales invalidas");
        }

        const isMatchPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isMatchPassword) {
          throw new Error("Credenciales invalidas");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
          image: user.image,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.image = token.image;
      return session;
    },
  },
};

const handler = nextAuth(authOptions);
export { handler as GET, handler as POST };
