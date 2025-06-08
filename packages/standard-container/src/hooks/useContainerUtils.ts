// 如果文件中有类似的定时器引用，也需要更新类型
// 将 NodeJS.Timeout 替换为 ReturnType<typeof setInterval>
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
    ...createLazyLoadUtils(pluginManager),
    ...createPluginUtils(pluginManager),
  }), [pluginManager, componentName]);
}