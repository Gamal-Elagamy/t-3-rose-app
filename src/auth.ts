import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ILoginResponse } from './shared/lib/types/auth';

export const authOptions: NextAuthOptions = {
  // Provider configuration
  providers: [
    // Credentials provider for username/password login
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      // Authorize function to validate credentials
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

        // Parse the login response
        const data: IApiResponse<ILoginResponse> = await response.json();

        // Check if login was successful
        if (!data.status) {
          throw new Error(data.message || 'Invalid credentials');
        }

        // Extract login data
        const loginData = data.payload!;

        return {
          id: loginData.user.id,
          token: loginData.token,
          user: loginData.user,
        };
      },
    }),
  ],

  // Callbacks configuration
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.token = user.token;
        token.user = user.user;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },

  // Pages configuration
  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  // Secret for JWT signing
  secret: process.env.NEXTAUTH_SECRET,
};
