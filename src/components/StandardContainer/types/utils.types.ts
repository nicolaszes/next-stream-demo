import { ReactNode } from 'react';
import { TrackingEvent, MonitoringMetric, LazyLoadOptions } from '../plugins';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UtilsTypes {
  // 插件管理工具类型
  export interface PluginUtils {
    enablePlugin: (type: string, name?: string) => boolean;
    disablePlugin: (type: string, name?: string) => boolean;
    togglePlugin: (type: string, name?: string) => boolean;
    isPluginEnabled: (type: string, name?: string) => boolean;
  }

  // 埋点工具类型
  export interface TrackingUtils {
    track: (event: Omit<TrackingEvent, 'componentName'>) => void;
  }

  // 监控工具类型
  export interface MonitoringUtils {
    record: (metric: Omit<MonitoringMetric, 'componentName'>) => void;
  }

  // 懒加载工具类型
  export interface LazyLoadUtils {
    createLazyComponent: (
      component: ReactNode | (() => Promise<ReactNode>),
      options?: LazyLoadOptions
    ) => React.ReactElement;
    createLazyImage: (
      src: string,
      alt?: string,
      options?: LazyLoadOptions & { className?: string }
    ) => React.ReactElement;
  }
}