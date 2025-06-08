import { MonitoringMetric } from './types';
import { MONITORING_PLUGIN_TYPE } from './constants';
import { BasePlugin } from '../base/BasePlugin';
import { initializePlugin } from '../base/pluginInitializer';

export class MonitoringPlugin implements BasePlugin {
  type = 'monitoring' as const;
  name = 'MonitoringPlugin';
  enabled: boolean;

  constructor(enabled: boolean = true) {
    this.enabled = enabled;
  }

  initialize(componentName: string) {
    // console.log('🔥 MonitoringPlugin initialize 被调用了！', componentName);
    initializePlugin(this, componentName, '性能监控功能');
    
    if (this.enabled) {
      // 原有的监控逻辑
      console.log(`MonitoringPlugin initialized for ${componentName}`);
    }
  }
}

export class DefaultMonitoringPlugin extends MonitoringPlugin {
  enabled = true;
  type: typeof MONITORING_PLUGIN_TYPE = MONITORING_PLUGIN_TYPE;
  name = 'DefaultMonitoring';

  record(metric: MonitoringMetric, componentName?: string): void {
    const fullMetricName = componentName ? `${componentName}.${metric.metricName}` : metric.metricName;
    console.log('Monitoring Metric:', {
      ...metric,
      metricName: fullMetricName,
      timestamp: metric.timestamp || Date.now(),
    });
    // 在这里添加通用的监控数据上报逻辑
  }
}