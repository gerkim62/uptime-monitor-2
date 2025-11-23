import { format, formatRelative } from 'date-fns'

export function formatDate(date: Date) {
  return format(date, 'PPP p')
}

export function formatTimeAgo(date: Date) {
  return formatRelative(date, new Date())
}

export function formatDateTime(date: Date) {
  return format(date, 'PPpp')
}
