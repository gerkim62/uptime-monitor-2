import { Card, CardContent } from '@/components/ui/card'

export default function StatCard({ title, value, icon: Icon, variant }) {
  const variantStyles = {
    blue: 'bg-blue-50 dark:bg-blue-950/50',
    green: 'bg-green-50 dark:bg-green-950/50',
    red: 'bg-red-50 dark:bg-red-950/50',
    purple: 'bg-purple-50 dark:bg-purple-950/50',
  }

  const iconStyles = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    red: 'text-red-600 dark:text-red-400',
    purple: 'text-purple-600 dark:text-purple-400',
  }

  return (
    <Card className="border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
      <div
        className={`absolute inset-0 opacity-30 dark:opacity-20 ${variantStyles[variant]}`}
      ></div>
      <CardContent className="pt-6 relative">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {title}
            </p>
            <p className="text-4xl font-bold mt-2">{value}</p>
          </div>
          <div
            className={`w-14 h-14 rounded-xl ${variantStyles[variant]} flex items-center justify-center`}
          >
            <Icon className={`w-7 h-7 ${iconStyles[variant]}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
