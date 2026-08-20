import { z } from "zod";

export const createAccountBodySchema = z.object({
  name: z.string().min(2),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Slug deve conter apenas letras minúsculas"),
  email: z.string().email(),
  password: z.string().min(8),
});

export type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>