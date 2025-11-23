import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    BETTER_AUTH_URL: z.url(),
    BETTER_AUTH_SECRET: z.string(),
    DATABASE_URL: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),

    GOOGLE_APP_PASSWORD: z.string(),
    GMAIL_USER: z.string(),
  },
  clientPrefix: 'VITE_',

  client: {
  },

  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
})
