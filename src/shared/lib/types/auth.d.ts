// Authentication response types

// Login response interface
export interface ILoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    phone: null;
    firstName: string;
    lastName: string;
    gender: 'MALE' | 'FEMALE';
    emailVerified: boolean;
    phoneVerified: boolean;
    role: 'USER' | 'ADMIN';
  };
}
