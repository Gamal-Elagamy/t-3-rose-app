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

export const photoFileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: 'file-too-large',
  })
  .refine((file) => ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type), {
    message: 'invalid-file-type',
  });

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
