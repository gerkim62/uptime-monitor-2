import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    BETTER_AUTH_URL: z.url(),
    DATABASE_URL: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().optional(),
    GITHUB_CLIENT_SECRET: z.string().optional(),
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
  },
  clientPrefix: 'VITE_',

  client: {
    VITE_BETTER_AUTH_URL: z.string().url(),
  },

  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
})
