import { z } from 'zod';

export type TokenPayload = z.infer<typeof tokenPayloadSchema>;

export const tokenPayloadSchema = z.object({
    sub: z.string(),
    slug: z.string()
});