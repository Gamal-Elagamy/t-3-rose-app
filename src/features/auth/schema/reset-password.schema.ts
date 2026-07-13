import { z } from 'zod';
export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, 'auth.forgotPw.validation.password.required')
      .min(8, 'auth.forgotPw.validation.password.minLength')
      .regex(/[A-Z]/, 'auth.forgotPw.validation.password.uppercase')
      .regex(/[a-z]/, 'auth.forgotPw.validation.password.lowercase')
      .regex(/[0-9]/, 'auth.forgotPw.validation.password.digit')
      .regex(/[^A-Za-z0-9]/, 'auth.forgotPw.validation.password.special'),

    confirmPassword: z.string().min(1, 'auth.forgotPw.validation.confirmPassword.required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'auth.forgotPw.validation.confirmPassword.mismatch',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
