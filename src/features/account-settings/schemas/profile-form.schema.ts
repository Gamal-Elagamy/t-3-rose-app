import { isValidPhoneNumber } from 'react-phone-number-input';
import z from 'zod';

export const profileFormSchema = z.object({
  firstName: z.string().min(1, 'firstName-required'),
  lastName: z.string().min(1, 'lastName-required'),
  phone: z
    .string()
    .min(1, 'phone-required')
    .refine(isValidPhoneNumber, { message: 'phone-invalid' }),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
