import z from 'zod';

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string('Invalid current password')
      .nonempty('accountSettings.updatePassword.validation.currentPasswordRequired'),
    newPassword: z
      .string('Invalid new password')
      .min(8, 'accountSettings.updatePassword.validation.minLength')
      .regex(/[A-Z]/, 'accountSettings.updatePassword.validation.uppercase')
      .regex(/[a-z]/, 'accountSettings.updatePassword.validation.lowercase')
      .regex(/[0-9]/, 'accountSettings.updatePassword.validation.digit')
      .regex(/[^A-Za-z0-9]/, 'accountSettings.updatePassword.validation.special')
      .nonempty('accountSettings.updatePassword.validation.newPasswordRequired'),
    confirmPassword: z
      .string('Invalid confirm password')
      .nonempty('accountSettings.updatePassword.validation.confirmPasswordRequired'),
  })
  .strict()
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'accountSettings.updatePassword.validation.mismatch',
    path: ['confirmPassword'],
  });
