import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: App })

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, AlertCircle, BarChart3, Bell, CheckCircle, Clock, Edit, Plus, RefreshCw, Settings, Trash2, TrendingUp } from 'lucide-react';

const App = () => {
  const monitors = [
    {
      id: 1,
      name: 'Main Website',
      url: 'https://example.com',
      status: 'UP',
      statusSince: 'Nov 20, 2025',
      statusDuration: '3 days ago',
      uptime: '99.9%',
      lastCheck: '2 min ago',
      responseTime: '245ms',
      statusCode: 200
    },
    {
      id: 2,
      name: 'API Server',
      url: 'https://api.example.com',
      status: 'UP',
      statusSince: 'Nov 15, 2025',
      statusDuration: '8 days ago',
      uptime: '100%',
      lastCheck: '1 min ago',
      responseTime: '120ms',
      statusCode: 200
    },
    {
      id: 3,
      name: 'Blog',
      url: 'https://blog.example.com',
      status: 'DOWN',
      statusSince: 'Nov 23, 2025',
      statusDuration: '2 hours ago',
      uptime: '98.5%',
      lastCheck: '30 sec ago',
      responseTime: 'N/A',
      statusCode: 503
    }
  ];

  const StatCard = ({ title, value, icon: Icon, variant }) => {
    const variantStyles = {
      blue: 'bg-blue-50 dark:bg-blue-950/50',
      green: 'bg-green-50 dark:bg-green-950/50',
      red: 'bg-red-50 dark:bg-red-950/50',
      purple: 'bg-purple-50 dark:bg-purple-950/50'
    };

    const iconStyles = {
      blue: 'text-blue-600 dark:text-blue-400',
      green: 'text-green-600 dark:text-green-400',
      red: 'text-red-600 dark:text-red-400',
      purple: 'text-purple-600 dark:text-purple-400'
    };

    return (
      <Card className="border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
        <div className={`absolute inset-0 opacity-30 dark:opacity-20 ${variantStyles[variant]}`}></div>
        <CardContent className="pt-6 relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
              <p className="text-4xl font-bold mt-2">{value}</p>
            </div>
            <div className={`w-14 h-14 rounded-xl ${variantStyles[variant]} flex items-center justify-center`}>
              <Icon className={`w-7 h-7 ${iconStyles[variant]}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-xl shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary flex items-center justify-center shadow-sm">
                <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Uptime Monitor</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Real-time service monitoring</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button variant="ghost" size="icon" className="relative hover:bg-accent rounded-xl">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-destructive rounded-full ring-2 ring-background animate-pulse" />
              </Button>
              <Avatar className="ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold">JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

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
                  <CardDescription className="mt-1">Manage and track all your services</CardDescription>
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
                  <div 
                    key={monitor.id} 
                    className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 sm:p-5 border-b last:border-b-0 sm:border sm:rounded-xl hover:bg-accent/50 transition-all duration-300 sm:hover:shadow-sm group"
                  >
                    {/* Mobile/Tablet Layout */}
                    <div className="flex items-start gap-3 flex-1">
                      <div className="relative mt-1">
                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                          monitor.status === 'UP' 
                            ? 'bg-green-500 dark:bg-green-400' 
                            : 'bg-red-500 dark:bg-red-400'
                        } shadow-sm`} />
                        <div className={`absolute inset-0 w-3 h-3 rounded-full ${
                          monitor.status === 'UP' 
                            ? 'bg-green-500 dark:bg-green-400' 
                            : 'bg-red-500 dark:bg-red-400'
                        } animate-ping`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-lg truncate group-hover:text-primary transition-colors">{monitor.name}</h3>
                          <Badge 
                            variant={monitor.status === 'UP' ? 'default' : 'destructive'}
                            className="font-semibold shadow-sm"
                          >
                            {monitor.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-primary font-medium mt-1 truncate">
                          {monitor.url}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {monitor.status} since {monitor.statusSince} ({monitor.statusDuration})
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Last checked: <span className="font-medium">{monitor.lastCheck}</span>
                        </p>
                        
                        {/* Stats on mobile */}
                        <div className="flex items-center gap-2 mt-3 text-xs sm:hidden flex-wrap">
                          <div className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 rounded-lg">
                            <span className="text-blue-600/70 dark:text-blue-400/70">Uptime: </span>
                            <span className="font-bold">{monitor.uptime}</span>
                          </div>
                          <div className="px-3 py-1.5 bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 rounded-lg">
                            <span className="text-purple-600/70 dark:text-purple-400/70">Response: </span>
                            <span className="font-bold">{monitor.responseTime}</span>
                          </div>
                          <div className="px-3 py-1.5 bg-muted rounded-lg">
                            <span className="text-muted-foreground">Code: </span>
                            <span className="font-bold">{monitor.statusCode}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Desktop Stats */}
                    <div className="hidden sm:flex items-center gap-6 lg:gap-8">
                      <div className="text-center px-4 py-2 bg-blue-50 dark:bg-blue-950/50 rounded-xl">
                        <p className="text-lg font-bold text-blue-700 dark:text-blue-300">{monitor.uptime}</p>
                        <p className="text-xs text-blue-600/70 dark:text-blue-400/70 font-medium">Uptime</p>
                      </div>
                      
                      <div className="text-center px-4 py-2 bg-purple-50 dark:bg-purple-950/50 rounded-xl">
                        <p className="text-lg font-bold text-purple-700 dark:text-purple-300">{monitor.responseTime}</p>
                        <p className="text-xs text-purple-600/70 dark:text-purple-400/70 font-medium">Response</p>
                      </div>
                      
                      <div className="text-center px-4 py-2 bg-muted rounded-xl">
                        <p className="text-lg font-bold">{monitor.statusCode}</p>
                        <p className="text-xs text-muted-foreground font-medium">Code</p>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-1 self-end sm:self-center">
                      <Button variant="ghost" size="icon" title="Check Now" className="hover:bg-accent rounded-xl">
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="View History" className="hover:bg-accent rounded-xl">
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Edit" className="hover:bg-accent rounded-xl">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Settings" className="hover:bg-accent rounded-xl">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Delete" className="hover:bg-accent hover:text-destructive rounded-xl">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
