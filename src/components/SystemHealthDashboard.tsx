
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Database, 
  Globe, 
  Server, 
  Wifi,
  Download,
  RefreshCw
} from 'lucide-react';
import { performanceMonitor } from '@/utils/performanceMonitor';
import { supabase } from '@/integrations/supabase/client';

interface SystemHealth {
  status: 'healthy' | 'warning' | 'error';
  database: boolean;
  api: boolean;
  performance: number;
  uptime: number;
}

const SystemHealthDashboard = () => {
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    status: 'healthy',
    database: true,
    api: true,
    performance: 0,
    uptime: 99.9
  });
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Check system health
  const checkSystemHealth = async () => {
    setLoading(true);
    try {
      // Check database connectivity
      const { error: dbError } = await supabase.from('user_profiles').select('id').limit(1);
      const databaseHealthy = !dbError;

      // Check API responsiveness
      const apiStart = Date.now();
      const { error: apiError } = await supabase.auth.getSession();
      const apiResponseTime = Date.now() - apiStart;
      const apiHealthy = !apiError && apiResponseTime < 5000;

      // Get performance metrics
      const metrics = performanceMonitor.getMetrics();
      const avgPerformance = metrics.length > 0 
        ? metrics.reduce((sum, m) => sum + m.duration, 0) / metrics.length 
        : 0;

      setPerformanceData(metrics);
      setSystemHealth({
        status: databaseHealthy && apiHealthy ? 'healthy' : 'warning',
        database: databaseHealthy,
        api: apiHealthy,
        performance: avgPerformance,
        uptime: 99.9 // Mock uptime
      });
    } catch (error) {
      console.error('Health check failed:', error);
      setSystemHealth({
        status: 'error',
        database: false,
        api: false,
        performance: 0,
        uptime: 0
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSystemHealth();
    const interval = setInterval(checkSystemHealth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Healthy</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800"><AlertTriangle className="h-3 w-3 mr-1" />Warning</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="h-3 w-3 mr-1" />Error</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const getPerformanceMetricsByType = () => {
    const grouped = performanceData.reduce((acc, metric) => {
      if (!acc[metric.type]) acc[metric.type] = [];
      acc[metric.type].push(metric.duration);
      return acc;
    }, {} as Record<string, number[]>);
    return grouped;
  };

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">
              {getStatusBadge(systemHealth.status)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {systemHealth.database ? (
                <Badge className="bg-green-100 text-green-800">Connected</Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800">Disconnected</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Status</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {systemHealth.api ? (
                <Badge className="bg-green-100 text-green-800">Online</Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800">Offline</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.uptime}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Monitoring */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>System performance and response times</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={checkSystemHealth}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(getPerformanceMetricsByType()).map(([type, durations]) => {
                  const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
                  const max = Math.max(...durations);
                  
                  return (
                    <div key={type} className="p-4 border rounded-lg">
                      <h4 className="font-medium capitalize mb-2">{type} Operations</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div>Count: {durations.length}</div>
                        <div>Avg: {formatDuration(avg)}</div>
                        <div>Max: {formatDuration(max)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Metrics</CardTitle>
                <CardDescription>Latest performance measurements</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => performanceMonitor.clearMetrics()}
              >
                Clear Metrics
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {performanceData.slice(0, 50).map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded text-sm">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {metric.type}
                      </Badge>
                      <span>{metric.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <span>{formatDuration(metric.duration)}</span>
                      <span>{new Date(metric.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
                {performanceData.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    No performance metrics available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>Recent system events and logs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                <div className="text-sm text-gray-500 p-2 border rounded">
                  {new Date().toLocaleString()} - System health check completed
                </div>
                <div className="text-sm text-gray-500 p-2 border rounded">
                  {new Date().toLocaleString()} - Performance monitoring active
                </div>
                <div className="text-sm text-gray-500 p-2 border rounded">
                  {new Date().toLocaleString()} - Dashboard initialized
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemHealthDashboard;
