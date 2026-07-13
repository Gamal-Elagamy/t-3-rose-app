import { IUser } from './user';

// Extend NextAuth types
declare module 'next-auth' {
  interface User {
    rememberMe?: boolean;

    user: IUser;
    token: string;
  }

  interface Session {
    rememberMe?: boolean;

    user: IUser;
  }
}

// Extend NextAuth JWT types
declare module 'next-auth/jwt' {
  interface JWT {
    rememberMe?: boolean;

    user: IUser;
    token: string;

    loginTime?: number;
  }
}
