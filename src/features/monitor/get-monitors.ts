import authMiddleware from '@/middlewares/auth-middleware'
import { createServerFn } from '@tanstack/react-start'
import { prisma } from '@/lib/prisma'

const getMonitors = createServerFn({
  method: 'GET',
})
.middleware([authMiddleware]).handler(async ({ context }) => {
  const { session:{session:{userId}} } = context

  const monitors = await prisma.monitor.findMany({
    where: {

      ownerId: userId,
    },
    include:{
      checks:{
        orderBy:{
          createdAt:'desc'
        },
        take:1,
      }
    }
  })

  const monitorsFormatted = monitors.map(monitor => ({
    ...monitor,
    lastCheck: monitor.checks[0] || null,
  }))

  return ({
    monitors: monitorsFormatted,
  })

})

export default getMonitors