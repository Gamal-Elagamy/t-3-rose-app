import { isValidPhoneNumber } from 'react-phone-number-input';
import { z } from 'zod';

export const addressSchema = z.object({
  title: z.string().min(1, 'title is required'),
  city: z.string().min(1, 'city is required'),
  street: z.string().min(1, 'street is required'),
  phone: z.string().min(1, 'phone is required').refine(isValidPhoneNumber, {
    message: 'phoneInvalid',
  }),
  isPrimary: z.boolean().optional(),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
