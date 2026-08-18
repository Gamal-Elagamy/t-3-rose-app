import z from 'zod';
import { updatePasswordSchema } from '../schemas/update-password.schema';

export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;
