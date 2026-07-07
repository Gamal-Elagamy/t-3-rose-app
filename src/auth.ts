import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ILoginResponse } from './shared/lib/types/auth';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
        rememberMe: { label: 'Remember Me', type: 'boolean' },
      },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        const data: IApiResponse<ILoginResponse> = await response.json();

        if (!data.status) {
          throw new Error(data.message || 'Invalid credentials');
        }

        const loginData = data.payload!;

        return {
          id: loginData.user.id,
          token: loginData.token,
          user: loginData.user,
          rememberMe: credentials?.rememberMe === 'true',
        };
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user, trigger }) => {
      if (user) {
        token.token = user.token;
        token.user = user.user;
        token.rememberMe = user.rememberMe;
        token.loginTime = Math.floor(Date.now() / 1000);
      }

      if (trigger === 'update' && user) {
        token.token = user.token;
        token.user = user.user;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user = token.user;
      session.rememberMe = token.rememberMe;
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
