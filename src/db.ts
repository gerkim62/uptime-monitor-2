import { PrismaClient } from './generated/prisma/client'

declare global {
  var __prisma: PrismaClient | undefined
}

export const prisma = globalThis.__prisma || new (PrismaClient as any)()

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma
}
