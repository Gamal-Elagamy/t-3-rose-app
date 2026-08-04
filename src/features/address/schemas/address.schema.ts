import { isValidPhoneNumber } from 'react-phone-number-input';
import { z } from 'zod';

export const addressSchema = z.object({
  title: z.string().min(1, 'title'),
  city: z.string().min(1, 'city'),
  street: z.string().min(1, 'street'),
  phone: z.string().min(1, 'phone').refine(isValidPhoneNumber, {
    message: 'phoneInvalid',
  }),
  isPrimary: z.boolean().optional(),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
