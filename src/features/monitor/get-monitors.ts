import { createServerFn } from '@tanstack/react-start'
import authMiddleware from '@/middlewares/auth-middleware'
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

  const monitorsFormatted = monitors.map(monitor => {
    const totalChecks = monitor.checks.length
    const upChecks = monitor.checks.filter(check => check.status === 'UP').length
    const uptimePercentage = totalChecks > 0 ? (upChecks / totalChecks) * 100 : 0

    const statusSince = monitor.checks.length > 0 ? monitor.checks[0].createdAt : monitor.createdAt

    return {
      id: monitor.id,
      name: monitor.name,
      url: monitor.url,
      createdAt: monitor.createdAt,
      updatedAt: monitor.updatedAt,
      checkIntervalMinutes: monitor.checkIntervalMinutes,
      ownerId: monitor.ownerId,
      lastCheck: monitor.checks[0] || null,
      uptimePercentage,
      statusSince,
    }
  })

  return ({
    monitors: monitorsFormatted,
  })

})

export default getMonitors