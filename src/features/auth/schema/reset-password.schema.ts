import { z } from 'zod';
export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, 'forgotPw.validation.password.required')
      .min(8, 'forgotPw.validation.password.minLength')
      .regex(/[A-Z]/, 'forgotPw.validation.password.uppercase')
      .regex(/[a-z]/, 'forgotPw.validation.password.lowercase')
      .regex(/[0-9]/, 'forgotPw.validation.password.digit')
      .regex(/[^A-Za-z0-9]/, 'forgotPw.validation.password.special'),

    confirmPassword: z.string().min(1, 'forgotPw.validation.confirmPassword.required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'forgotPw.validation.confirmPassword.mismatch',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
