import { PluginManager } from '../core/PluginManager';
import { MonitoringPlugin, MonitoringMetric } from '../plugins';

export function createMonitoringUtils(pluginManager: PluginManager, componentName: string) {
  return {
    record: (metric: Omit<MonitoringMetric, 'componentName'>): void => {
      const monitoringPlugins = pluginManager.getPluginsByType<MonitoringPlugin>('monitoring');
      monitoringPlugins.forEach((plugin) => plugin.record(metric, componentName));
    },
  };
}