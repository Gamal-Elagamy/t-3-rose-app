import { isValidPhoneNumber } from 'react-phone-number-input';
import { z } from 'zod';

export type AddressValidationKey =
  | 'titleRequired'
  | 'cityRequired'
  | 'streetRequired'
  | 'phoneRequired'
  | 'phoneInvalid';

export const addressSchema = z.object({
  title: z.string().min(1, 'titleRequired'),

  city: z.string().min(1, 'cityRequired'),

  street: z.string().min(1, 'streetRequired'),

  phone: z.string().min(1, 'phoneRequired').refine(isValidPhoneNumber, {
    message: 'phoneInvalid',
  }),

  isPrimary: z.boolean().optional(),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
