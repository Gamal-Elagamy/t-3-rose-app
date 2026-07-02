import { z } from 'zod';

export const emailSchema = z.object({
  email: z.email('validation.email'),
});

export type EmailFormData = z.infer<typeof emailSchema>;
