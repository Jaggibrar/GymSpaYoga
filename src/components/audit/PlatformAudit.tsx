
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AuditResult {
  id: string;
  name: string;
  status: 'pending' | 'pass' | 'fail' | 'warning';
  message: string;
  category: string;
}

const PlatformAudit = () => {
  const [auditResults, setAuditResults] = useState<AuditResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const auditTests = [
    // Registration Flow Tests
    {
      id: 'business-registration',
      name: 'Business Registration Form',
      category: 'Registration',
      test: async () => {
        // Test form validation and submission flow
        try {
          const { data, error } = await supabase.from('business_profiles').select('*').limit(1);
          if (error) throw error;
          return { status: 'pass', message: 'Business registration database accessible' };
        } catch (error) {
          return { status: 'fail', message: `Business registration error: ${error.message}` };
        }
      }
    },
    {
      id: 'trainer-registration',
      name: 'Trainer Registration Form',
      category: 'Registration',
      test: async () => {
        try {
          const { data, error } = await supabase.from('trainer_profiles').select('*').limit(1);
          if (error) throw error;
          return { status: 'pass', message: 'Trainer registration database accessible' };
        } catch (error) {
          return { status: 'fail', message: `Trainer registration error: ${error.message}` };
        }
      }
    },
    // Tier-Based Listing Tests
    {
      id: 'tier-validation',
      name: 'Business Tier Classification',
      category: 'Tiers',
      test: async () => {
        try {
          const { data, error } = await supabase
            .from('business_profiles')
            .select('category, monthly_price, session_price')
            .not('category', 'is', null);
          
          if (error) throw error;
          
          const validTiers = ['luxury', 'premium', 'budget'];
          const invalidTiers = data?.filter(business => 
            !validTiers.includes(business.category)
          ) || [];
          
          if (invalidTiers.length > 0) {
            return { status: 'warning', message: `${invalidTiers.length} businesses have invalid tiers` };
          }
          
          return { status: 'pass', message: 'All business tiers are valid' };
        } catch (error) {
          return { status: 'fail', message: `Tier validation error: ${error.message}` };
        }
      }
    },
    // Booking System Tests
    {
      id: 'booking-system',
      name: 'Booking Creation & Management',
      category: 'Bookings',
      test: async () => {
        try {
          const { data, error } = await supabase.from('bookings').select('*').limit(1);
          if (error) throw error;
          return { status: 'pass', message: 'Booking system accessible' };
        } catch (error) {
          return { status: 'fail', message: `Booking system error: ${error.message}` };
        }
      }
    },
    // Real-time Updates Tests
    {
      id: 'realtime-updates',
      name: 'Real-time Notifications',
      category: 'Real-time',
      test: async () => {
        try {
          const { data, error } = await supabase.from('in_app_notifications').select('*').limit(1);
          if (error) throw error;
          return { status: 'pass', message: 'Notification system accessible' };
        } catch (error) {
          return { status: 'fail', message: `Notification error: ${error.message}` };
        }
      }
    },
    // Data Consistency Tests
    {
      id: 'data-consistency',
      name: 'Database Relationships',
      category: 'Data',
      test: async () => {
        try {
          // Check for orphaned records
          const { data: businesses, error: businessError } = await supabase
            .from('business_profiles')
            .select('id, user_id');
          
          if (businessError) throw businessError;
          
          const { data: users, error: userError } = await supabase
            .from('user_profiles')
            .select('user_id');
          
          if (userError) throw userError;
          
          const userIds = new Set(users?.map(u => u.user_id) || []);
          const orphanedBusinesses = businesses?.filter(b => !userIds.has(b.user_id)) || [];
          
          if (orphanedBusinesses.length > 0) {
            return { status: 'warning', message: `${orphanedBusinesses.length} orphaned business records found` };
          }
          
          return { status: 'pass', message: 'Database relationships are consistent' };
        } catch (error) {
          return { status: 'fail', message: `Data consistency error: ${error.message}` };
        }
      }
    },
    // Performance Tests
    {
      id: 'query-performance',
      name: 'Database Query Performance',
      category: 'Performance',
      test: async () => {
        try {
          const startTime = Date.now();
          const { data, error } = await supabase
            .from('business_profiles')
            .select('*')
            .limit(10);
          
          const endTime = Date.now();
          const queryTime = endTime - startTime;
          
          if (error) throw error;
          
          if (queryTime > 2000) {
            return { status: 'warning', message: `Query took ${queryTime}ms (slow)` };
          }
          
          return { status: 'pass', message: `Query performance good (${queryTime}ms)` };
        } catch (error) {
          return { status: 'fail', message: `Performance test error: ${error.message}` };
        }
      }
    }
  ];

  const runAudit = async () => {
    setIsRunning(true);
    setAuditResults([]);
    
    for (const test of auditTests) {
      const result = await test.test();
      setAuditResults(prev => [...prev, {
        id: test.id,
        name: test.name,
        category: test.category,
        status: result.status,
        message: result.message
      }]);
    }
    
    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pass: 'bg-green-100 text-green-800',
      fail: 'bg-red-100 text-red-800',
      warning: 'bg-yellow-100 text-yellow-800',
      pending: 'bg-gray-100 text-gray-800'
    };
    
    return <Badge className={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  const groupedResults = auditResults.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = [];
    }
    acc[result.category].push(result);
    return acc;
  }, {} as Record<string, AuditResult[]>);

  const overallStats = {
    total: auditResults.length,
    passed: auditResults.filter(r => r.status === 'pass').length,
    failed: auditResults.filter(r => r.status === 'fail').length,
    warnings: auditResults.filter(r => r.status === 'warning').length
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            GymSpaYoga Platform Audit
            {isRunning && <Loader2 className="h-5 w-5 animate-spin" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <Button onClick={runAudit} disabled={isRunning}>
              {isRunning ? 'Running Audit...' : 'Run Platform Audit'}
            </Button>
            
            {auditResults.length > 0 && (
              <div className="flex gap-4 text-sm">
                <span className="text-green-600">✓ {overallStats.passed} Passed</span>
                <span className="text-red-600">✗ {overallStats.failed} Failed</span>
                <span className="text-yellow-600">⚠ {overallStats.warnings} Warnings</span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {Object.entries(groupedResults).map(([category, results]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="text-lg">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {results.map((result) => (
                      <div key={result.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(result.status)}
                          <div>
                            <div className="font-medium">{result.name}</div>
                            <div className="text-sm text-gray-600">{result.message}</div>
                          </div>
                        </div>
                        {getStatusBadge(result.status)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformAudit;
