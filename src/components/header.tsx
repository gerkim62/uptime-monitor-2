import { Activity, Bell } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="border-b bg-card/80 backdrop-blur-xl shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Uptime Monitor</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Real-time service monitoring
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-accent rounded-xl"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-destructive rounded-full ring-2 ring-background animate-pulse" />
            </Button>
            <Avatar className="ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                JD
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}
