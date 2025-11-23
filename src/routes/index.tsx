import { createFileRoute, useLoaderData } from '@tanstack/react-router'

import {
  Activity,
  AlertCircle,
  CheckCircle,
  Plus,
  TrendingUp,
} from 'lucide-react'
import type { Monitor, MonitorCheck } from '@/generated/prisma/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Header from '@/components/header'
import StatCard from '@/components/start-card'
import MonitorCard from '@/components/monitor-card'
import getMonitors from '@/features/monitor/get-monitors'

const App = () => {
  const data = useLoaderData({ from: '/' })
  const monitors: Array<Monitor & { lastCheck: MonitorCheck | null; uptimePercentage: number; statusSince: Date }> = data.monitors

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <StatCard
              title="Total Monitors"
              value="3"
              icon={Activity}
              variant="blue"
            />
            <StatCard
              title="Online"
              value="2"
              icon={CheckCircle}
              variant="green"
            />
            <StatCard
              title="Offline"
              value="1"
              icon={AlertCircle}
              variant="red"
            />
            <StatCard
              title="Avg Uptime"
              value="99.5%"
              icon={TrendingUp}
              variant="purple"
            />
          </div>

          {/* Monitors List */}
          <Card className="border shadow-md">
            <CardHeader className="bg-muted/50 border-b">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-2xl">Your Monitors</CardTitle>
                  <CardDescription className="mt-1">
                    Manage and track all your services
                  </CardDescription>
                </div>
                <Button className="shadow-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Monitor
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-0 sm:px-6 pt-4">
              <div className="space-y-3 sm:space-y-3">
                {monitors.map((monitor) => (
                  <MonitorCard key={monitor.id} monitor={monitor} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: App,
  loader: async () => {
    const data = await getMonitors()
    return data
  }
})
