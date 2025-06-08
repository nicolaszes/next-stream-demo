// 核心组件和管理器
export { BaseContainer } from './BaseContainer';
export { PluginManager } from './PluginManager';

// 类型定义
export type {
  BaseContainerProps,
  BaseContainerState,
  PluginConfig,
  BaseContainerUtils,
  ExtendableContainerUtils
} from './types';

// 插件类型常量 - 重新导出以保持向后兼容
export type { ERROR_CAPTURE_PLUGIN_TYPE } from '../plugins/ErrorCapturePlugin/constants';
export type { LAZY_LOAD_PLUGIN_TYPE } from '../plugins/LazyLoadPlugin/constants';
export type { MONITORING_PLUGIN_TYPE } from '../plugins/MonitoringPlugin/constants';
export type { TRACKING_PLUGIN_TYPE } from '../plugins/TrackingPlugin/constants';