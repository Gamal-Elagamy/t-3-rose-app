import z from "zod";
import { loginPopoverSchema } from "../schema/login-popover-schema";

export type LoginPopoverFormValues = z.infer<typeof loginPopoverSchema>;

export type LoginPopoverProps = {
  className?: string;
};