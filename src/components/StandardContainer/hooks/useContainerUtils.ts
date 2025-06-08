import { useMemo } from 'react';
import { PluginManager } from '../core/PluginManager';
import { StandardContainerUtils } from '../types';
import { createTrackingUtils } from '../utils/trackingUtils';
import { createMonitoringUtils } from '../utils/monitoringUtils';
import { createLazyLoadUtils } from '../utils/lazyLoadUtils';
import { createPluginUtils } from '../utils/pluginUtils';

export function useContainerUtils(
  pluginManager: PluginManager,
  componentName: string
): StandardContainerUtils {
  return useMemo(() => ({
    ...createTrackingUtils(pluginManager, componentName),
    ...createMonitoringUtils(pluginManager, componentName),
    ...createLazyLoadUtils(pluginManager, componentName),
    ...createPluginUtils(pluginManager),
  }), [pluginManager, componentName]);
}