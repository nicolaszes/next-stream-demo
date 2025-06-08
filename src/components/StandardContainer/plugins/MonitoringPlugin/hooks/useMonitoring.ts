import { useCallback, useEffect, useRef } from 'react';
import { MonitoringMetric } from '../types';

export interface UseMonitoringOptions {
  componentName?: string;
  autoCollect?: boolean;
  collectInterval?: number;
}

export interface UseMonitoringReturn {
  record: (metric: Omit<MonitoringMetric, 'timestamp'>) => void;
  recordPerformance: (metricName: string, startTime: number, tags?: Record<string, string>) => void;
  recordCounter: (metricName: string, value?: number, tags?: Record<string, string>) => void;
  recordGauge: (metricName: string, value: number, tags?: Record<string, string>) => void;
  startTimer: (metricName: string) => () => void;
}

export function useMonitoring(options: UseMonitoringOptions = {}): UseMonitoringReturn {
  const { componentName, autoCollect = true, collectInterval = 30000 } = options;
  const timersRef = useRef<Map<string, number>>(new Map());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const record = useCallback((metric: Omit<MonitoringMetric, 'timestamp'>) => {
    const monitoringMetric: MonitoringMetric = {
      ...metric,
      timestamp: Date.now(),
    };

    // 这里可以集成实际的监控服务
    console.log('Monitoring:', {
      ...monitoringMetric,
      componentName,
    });
  }, [componentName]);

  const recordPerformance = useCallback((metricName: string, startTime: number, tags?: Record<string, string>) => {
    const duration = performance.now() - startTime;
    record({
      metricName: `${metricName}.duration`,
      value: duration,
      tags,
    });
  }, [record]);

  const recordCounter = useCallback((metricName: string, value = 1, tags?: Record<string, string>) => {
    record({
      metricName: `${metricName}.count`,
      value,
      tags,
    });
  }, [record]);

  const recordGauge = useCallback((metricName: string, value: number, tags?: Record<string, string>) => {
    record({
      metricName: `${metricName}.gauge`,
      value,
      tags,
    });
  }, [record]);

  const startTimer = useCallback((metricName: string) => {
    const startTime = performance.now();
    timersRef.current.set(metricName, startTime);
    
    return () => {
      const start = timersRef.current.get(metricName);
      if (start !== undefined) {
        recordPerformance(metricName, start);
        timersRef.current.delete(metricName);
      }
    };
  }, [recordPerformance]);

  // 自动收集基础性能指标
  useEffect(() => {
    if (!autoCollect) return;

    const collectMetrics = () => {
      // 收集内存使用情况
      if ('memory' in performance) {
        const memory = (performance as Performance & { memory: { usedJSHeapSize: number; totalJSHeapSize: number } }).memory;
        recordGauge('memory.used', memory.usedJSHeapSize, { unit: 'bytes' });
        recordGauge('memory.total', memory.totalJSHeapSize, { unit: 'bytes' });
      }

      // 收集页面性能指标
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        recordGauge('page.load_time', navigation.loadEventEnd - navigation.loadEventStart, { unit: 'ms' });
        recordGauge('page.dom_ready', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart, { unit: 'ms' });
      }
    };

    collectMetrics(); // 立即收集一次
    intervalRef.current = setInterval(collectMetrics, collectInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoCollect, collectInterval, recordGauge]);

  return {
    record,
    recordPerformance,
    recordCounter,
    recordGauge,
    startTimer,
  };
}