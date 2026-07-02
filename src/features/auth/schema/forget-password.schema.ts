import { z } from 'zod';

export const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'validation.email.required')
    .pipe(z.email('validation.email.invalid')),
});

export type EmailFormData = z.infer<typeof emailSchema>;
