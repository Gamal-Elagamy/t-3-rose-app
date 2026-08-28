import { isValidPhoneNumber } from 'react-phone-number-input';
import z from 'zod';

export const profileFormSchema = z.object({
  photo: z.string().optional(),
  firstName: z.string().min(1, 'firstName-required'),
  lastName: z.string().min(1, 'lastName-required'),
  phone: z
    .string()
    .min(1, 'phone-required')
    .refine(isValidPhoneNumber, { message: 'phone-invalid' }),
});

export const photoFileSchema = z.object({
  photo: z
    .union([
      z.string().url(),
      z
        .file()
        .min(1)
        .max(5 * 1024 * 1024)
        .mime(['image/jpeg', 'image/png', 'image/gif', 'image/webp']),
    ])
    .optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export type FileField = z.infer<typeof photoFileSchema>;
