import { z } from 'zod';

const roleSchema = z
  .object({
    Uuid: z.string().uuid(),
    Name: z.string().min(1),
    Description: z.string().nullable(),
    Ten: z.string().min(1),
    UserPlatform: z.string().min(1),
    Permissions: z.array(z.string())
  })
  .passthrough();

const userSchema = z
  .object({
    Ten: z.string().min(1),
    Uuid: z.string().uuid(),
    Type: z.string().min(1),
    Roles: z.array(z.string()),
    RoleUuids: z.array(z.string().uuid()),
    NewRoles: z.array(roleSchema),
    Permissions: z.array(z.string()),
    Name: z.string().min(1),
    Username: z.string().min(1),
    Status: z.string().min(1),
    Pwd: z.null(),
    Salt: z.null()
  })
  .passthrough();

export const authTokenResponseSchema = z
  .object({
    Token: z.string().min(1),
    TokenExpires: z.number().int().positive(),
    RefreshToken: z.string().min(1),
    RefreshTokenExpires: z.number().int().positive(),
    RecoveryCode: z.string(),
    User: userSchema
  })
  .passthrough();

export type AuthTokenResponse = z.infer<typeof authTokenResponseSchema>;
