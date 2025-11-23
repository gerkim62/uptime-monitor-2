import {
  Activity,
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Edit2,
  Globe,
  History,
  RefreshCw,
  Server,
  Trash2,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import type {
  LucideIcon} from 'lucide-react';
import type { Monitor, MonitorCheck, MonitorStatus } from '@/generated/prisma/client'
import { formatTimeAgo } from '@/lib/formatters'

const StatusBadge = ({
  status,
}: {
  status: MonitorStatus | 'UNKNOWN' | undefined
}) => {
  const statusColors = {
    UP: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      ping: 'bg-emerald-400',
      solid: 'bg-emerald-500',
    },
    DOWN: {
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200',
      ping: 'bg-rose-400',
      solid: 'bg-rose-500',
    },
    UNKNOWN: {
      bg: 'bg-slate-50',
      text: 'text-slate-700',
      border: 'border-slate-200',
      ping: 'bg-slate-400',
      solid: 'bg-slate-500',
    },
  }

  const colors = status ? statusColors[status] : statusColors.UNKNOWN

  return (
    <div
      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide border ${colors.bg} ${colors.text} ${colors.border}`}
    >
      <span className={`relative flex h-2 w-2`}>
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colors.ping}`}
        ></span>
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${colors.solid}`}
        ></span>
      </span>
      {status || 'UNKNOWN'}
    </div>
  )
}

const MetricItem = ({
  icon: Icon,
  label,
  value,
  subValue,
  colorClass = 'text-slate-700',
}: {
  icon: LucideIcon
  label: string
  value: string
  subValue?: string
  colorClass?: string
}) => (
  <div className="flex flex-col">
    <div className="flex items-center gap-2 text-slate-400 mb-1">
      <Icon size={14} />
      <span className="text-xs font-medium uppercase tracking-wider">
        {label}
      </span>
    </div>
    <div className="flex items-baseline gap-2">
      <span className={`text-lg font-semibold ${colorClass}`}>{value}</span>
      {subValue && <span className="text-xs text-slate-400">{subValue}</span>}
    </div>
  </div>
)

const MonitorCard = ({
  monitor,
}: {
  monitor: Monitor & {
    lastCheck: MonitorCheck | null
    uptimePercentage: number
    statusSince: Date
  }
}) => {
  const status: MonitorStatus | 'UNKNOWN' =
    monitor.lastCheck?.status || 'UNKNOWN'
  const [isRefreshing] = useState(false)

  const statusColors = {
    UP: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      solid: 'bg-emerald-500',
    },
    DOWN: {
      bg: 'bg-rose-50',
      text: 'text-rose-600',
      solid: 'bg-rose-500',
    },
    UNKNOWN: {
      bg: 'bg-slate-50',
      text: 'text-slate-600',
      solid: 'bg-slate-500',
    },
  }

  const handleRefresh = () => {}

  const onDelete = (id: string) => {
    console.log('Delete monitor with ID:', id)
  }

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Hover Indicator Strip - appears only on hover */}
      <div
        className={`absolute left-0 top-6 bottom-6 w-1.5 rounded-r-full transition-all duration-300 opacity-0 group-hover:opacity-100 ${statusColors[status].solid}`}
      />

      <div className="p-6">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-4">
            <div
              className={`p-3 rounded-xl flex items-center justify-center h-12 w-12 ${statusColors[status].bg} ${statusColors[status].text}`}
            >
              <Server size={24} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-bold text-slate-800 text-lg">
                  {monitor.name}
                </h3>
                <StatusBadge status={status} />
              </div>
              <a
                href={monitor.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600 transition-colors group-hover/link"
              >
                <Globe size={12} />
                {monitor.url}
                <ArrowUpRight
                  size={12}
                  className="opacity-0 group-hover/link:opacity-100 transition-opacity"
                />
              </a>
            </div>
          </div>

          {/* Code Badge */}
          {monitor.lastCheck && (
            <div className={`hidden sm:flex flex-col items-end`}>
              <span
                className={`text-2xl font-black opacity-20 ${status === 'UP' ? 'text-slate-400' : status === 'DOWN' ? 'text-rose-400' : 'text-slate-400'}`}
              >
                {monitor.lastCheck.responseCode}
              </span>
            </div>
          )}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b border-slate-100 bg-slate-50/50 rounded-xl px-4 mb-6">
          <MetricItem
            icon={Zap}
            label="Latency"
            value={
              monitor.lastCheck
                ? monitor.lastCheck.responseTimeMs.toString()
                : 'N/A'
            }
            colorClass={
              status === 'UP'
                ? monitor.lastCheck && monitor.lastCheck.responseTimeMs < 200
                  ? 'text-emerald-600'
                  : 'text-amber-600'
                : status === 'DOWN'
                  ? 'text-rose-600'
                  : 'text-slate-600'
            }
          />
          <MetricItem
            icon={Activity}
            label="Uptime"
            value={monitor.uptimePercentage.toFixed(2) + '%'}
            colorClass="text-slate-700"
          />
          <MetricItem
            icon={Clock}
            label="Last Check"
            value={
              monitor.lastCheck
                ? formatTimeAgo(monitor.lastCheck.createdAt)
                : 'Never'
            }
          />
          <MetricItem
            icon={
              status === 'UP'
                ? CheckCircle2
                : status === 'DOWN'
                  ? AlertCircle
                  : Clock
            }
            label="Status Since"
            value={formatTimeAgo(monitor.statusSince)}
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
              <History size={16} />
              <span className="hidden sm:inline">History</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
              <Edit2 size={16} />
              <span className="hidden sm:inline">Edit</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className={`p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all ${isRefreshing ? 'animate-spin text-blue-600' : ''}`}
              title="Refresh Monitor"
            >
              <RefreshCw size={18} />
            </button>
            <div className="w-px h-4 bg-slate-200 mx-1"></div>
            <button
              onClick={() => onDelete(monitor.id)}
              className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Delete Monitor"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonitorCard
