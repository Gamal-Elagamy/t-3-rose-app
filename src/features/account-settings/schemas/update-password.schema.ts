import z from 'zod';

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string('Invalid current password').nonempty('Current password is required'),
    newPassword: z
      .string('Invalid new password')
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must include an uppercase letter')
      .regex(/[a-z]/, 'Password must include a lowercase letter')
      .regex(/[0-9]/, 'Password must include a number')
      .regex(/[^A-Za-z0-9]/, 'Password must include a special character')
      .nonempty('New password is required'),
    confirmPassword: z.string('Invalid confirm password').nonempty('Confirm password is required'),
  })
  .strict()
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password don't match",
    path: ['confirmPassword'],
  });
