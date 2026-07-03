import { z } from 'zod';
import { registerSchema } from '../schemas/register.schema';

export type RegisterFormValues = z.infer<typeof registerSchema>;

export interface IRegisterFields {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  username: string;
  gender: string;
  phone?: string;
}
