// User interface for authentication and authorization
export interface IUser {
  id: string;
  username: string;
  email: string;
  phone: string | null;
  firstName: string;
  lastName: string;
  gender: 'MALE' | 'FEMALE' | null;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  photo?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
