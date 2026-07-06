import { z } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input';

export const registerSchema = z
  .object({
    firstName: z.string().min(1, 'firstName'),
    lastName: z.string().min(1, 'lastName'),
    username: z.string().min(1, 'username'),
    email: z.string().email('email'),
    phone: z.string().min(1, 'phone').refine(isValidPhoneNumber, { message: 'phoneInvalid' }),
    otp: z.string().length(6, 'otp'),
    gender: z.enum(['MALE', 'FEMALE'], { message: 'gender' }),
    password: z
      .string()
      .min(8, 'password.minLength')
      .regex(/[A-Z]/, 'password.uppercase')
      .regex(/[a-z]/, 'password.lowercase')
      .regex(/[0-9]/, 'password.digit')
      .regex(/[^A-Za-z0-9]/, 'password.special'),
    confirmPassword: z.string().min(1, 'confirmPassword.required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'confirmPassword.mismatch',
    path: ['confirmPassword'],
  });
