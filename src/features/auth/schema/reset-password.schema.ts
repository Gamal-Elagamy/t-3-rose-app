import { z } from 'zod';
export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, 'validation.password.required')
      .min(8, 'validation.password.minLength')
      .regex(/[A-Z]/, 'validation.password.uppercase')
      .regex(/[a-z]/, 'validation.password.lowercase')
      .regex(/[0-9]/, 'validation.password.digit')
      .regex(/[^A-Za-z0-9]/, 'validation.password.special'),

    confirmPassword: z.string().min(1, 'validation.confirmPassword.required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'validation.confirmPassword.mismatch',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
