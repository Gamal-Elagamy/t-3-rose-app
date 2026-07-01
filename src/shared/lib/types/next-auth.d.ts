import { IUser } from './user';

// Extend NextAuth types
declare module 'next-auth' {
  interface User {
    user: IUser;
    token: string;
  }

  interface Session {
    user: IUser;
  }
}

// Extend NextAuth JWT types
declare module 'next-auth/jwt' {
  interface JWT {
    user: IUser;
    token: string;
  }
}
