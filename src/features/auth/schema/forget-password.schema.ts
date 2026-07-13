import { z } from 'zod';

export const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'forgotPw.validation.email.required')
    .pipe(z.email('forgotPw.validation.email.invalid')),
});

export type EmailFormData = z.infer<typeof emailSchema>;
