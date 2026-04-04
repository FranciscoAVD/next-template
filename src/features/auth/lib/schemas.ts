// Feature-specific Zod schemas or similar
import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name is too long"),
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be less than 20 characters"),
});
export const signInSchema = z.object({
  email: z.email(),
  password: z.string(),
});
