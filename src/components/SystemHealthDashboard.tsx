
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertTriangle, Activity, Zap, Shield } from 'lucide-react';
import { errorTracker } from '@/utils/errorTracking';
import { performanceMonitor } from '@/utils/performanceMonitor';

const SystemHealthDashboard = () => {
  const [healthData, setHealthData] = useState({
    errors: [] as any[],
    metrics: [] as any[],
    overallHealth: 10,
    lastUpdated: new Date()
  });

  useEffect(() => {
    const updateHealthData = () => {
      const errors = errorTracker.getErrors();
      const metrics = performanceMonitor.getMetrics();
      
      // Calculate health score
      let healthScore = 10;
      
      // Deduct points for errors
      const criticalErrors = errors.filter(e => e.severity === 'critical').length;
      const highErrors = errors.filter(e => e.severity === 'high').length;
      const mediumErrors = errors.filter(e => e.severity === 'medium').length;
      
      healthScore -= criticalErrors * 2;
      healthScore -= highErrors * 1;
      healthScore -= mediumErrors * 0.5;
      
      // Deduct points for poor performance
      const avgResponseTime = performanceMonitor.getAverageMetric('api_response_time');
      if (avgResponseTime > 2000) healthScore -= 1;
      if (avgResponseTime > 5000) healthScore -= 2;
      
      const lcp = performanceMonitor.getAverageMetric('lcp');
      if (lcp > 2500) healthScore -= 1;
      if (lcp > 4000) healthScore -= 2;
      
      healthScore = Math.max(0, Math.min(10, healthScore));
      
      setHealthData({
        errors: errors.slice(-10), // Last 10 errors
        metrics: metrics.slice(-20), // Last 20 metrics
        overallHealth: healthScore,
        lastUpdated: new Date()
      });
    };
    
    updateHealthData();
    const interval = setInterval(updateHealthData, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const getHealthStatus = (score: number) => {
    if (score >= 9) return { label: 'Excellent', color: 'bg-green-500', icon: CheckCircle };
    if (score >= 7) return { label: 'Good', color: 'bg-blue-500', icon: CheckCircle };
    if (score >= 5) return { label: 'Fair', color: 'bg-yellow-500', icon: AlertTriangle };
    return { label: 'Poor', color: 'bg-red-500', icon: XCircle };
  };

  const healthStatus = getHealthStatus(healthData.overallHealth);
  const HealthIcon = healthStatus.icon;

  return (
    <div className="space-y-6">
      {/* Overall Health Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Health Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold">{healthData.overallHealth.toFixed(1)}/10</div>
              <div className="flex items-center gap-2">
                <HealthIcon className={`h-5 w-5 text-white`} />
                <Badge className={healthStatus.color}>{healthStatus.label}</Badge>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {healthData.lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Average API Response Time</span>
                <Badge variant="outline">
                  {performanceMonitor.getAverageMetric('api_response_time').toFixed(0)}ms
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Largest Contentful Paint</span>
                <Badge variant="outline">
                  {performanceMonitor.getAverageMetric('lcp').toFixed(0)}ms
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">First Input Delay</span>
                <Badge variant="outline">
                  {performanceMonitor.getAverageMetric('fid').toFixed(0)}ms
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Error Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Critical Errors</span>
                <Badge variant="destructive">
                  {healthData.errors.filter(e => e.severity === 'critical').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">High Priority Errors</span>
                <Badge variant="secondary">
                  {healthData.errors.filter(e => e.severity === 'high').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Medium Priority Errors</span>
                <Badge variant="outline">
                  {healthData.errors.filter(e => e.severity === 'medium').length}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Errors */}
      {healthData.errors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {healthData.errors.map((error, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <Badge 
                      variant={error.severity === 'critical' ? 'destructive' : 'secondary'}
                    >
                      {error.severity}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(error.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{error.message}</p>
                  {error.context && (
                    <pre className="text-xs text-gray-600 mt-1 overflow-x-auto">
                      {JSON.stringify(error.context, null, 2)}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>System Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button 
              onClick={() => {
                errorTracker.clearErrors();
                performanceMonitor.clearMetrics();
              }}
              variant="outline"
            >
              Clear Logs
            </Button>
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
            >
              Refresh System
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemHealthDashboard;
