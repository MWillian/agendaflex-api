import { z } from 'zod';

export const refreshTokenBodySchema = z.object({
  refresh_token: z.string().min(1, 'Refresh token is required'),
});

export type RefreshTokenBodySchema = z.infer<typeof refreshTokenBodySchema>;