import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginApi } from './features/auth/apis/auth.api';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials.password) {
          throw new Error('Username and password are required');
        }

        const loginData = await loginApi({
          username: credentials.username,
          password: credentials.password,
        });

        return {
          id: loginData.user.id,
          token: loginData.token,
          user: loginData.user,
        };
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user, trigger, session }) => {
      if (user) {
        token.token = user.token;
        token.user = user.user;
      }

      if (trigger === 'update' && session?.user) {
        token.user = session.user;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: Number(process.env.NEXTAUTH_SESSION_MAX_AGE) || 7 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
};
