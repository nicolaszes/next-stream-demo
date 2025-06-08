import { BasePlugin } from '../base/BasePlugin';
import { MONITORING_PLUGIN_TYPE } from './constants';

export interface MonitoringMetric {
  metricName: string;
  value: number;
  tags?: Record<string, string>;
  timestamp?: number;
}

export interface MonitoringPlugin extends BasePlugin {
  type: typeof MONITORING_PLUGIN_TYPE;
  record: (metric: MonitoringMetric, componentName?: string) => void;
}