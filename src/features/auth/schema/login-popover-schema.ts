import { z } from 'zod';

export const loginPopoverSchema = z.object({
  username: z.string().min(1, 'login.usernameRequired'),
  password: z.string().min(1, 'login.passwordRequired'),
});

export type LoginPopoverFormValues = z.infer<typeof loginPopoverSchema>;
