// 修改BasePlugin的导入路径
export type { BasePlugin } from './base/BasePlugin';

// 错误捕获插件
export { DefaultErrorCapturePlugin } from './ErrorCapturePlugin/index';
export type { ErrorCapturePlugin } from './ErrorCapturePlugin/types';
export { ERROR_CAPTURE_PLUGIN_TYPE } from './ErrorCapturePlugin/constants';

// 埋点插件
export { DefaultTrackingPlugin } from './TrackingPlugin';
export type { TrackingPlugin, TrackingEvent } from './TrackingPlugin';
export { TRACKING_PLUGIN_TYPE } from './TrackingPlugin';

// // 监控插件
export { DefaultMonitoringPlugin } from './MonitoringPlugin';
export type { MonitoringPlugin, MonitoringMetric } from './MonitoringPlugin';
export { MONITORING_PLUGIN_TYPE } from './MonitoringPlugin';

// 懒加载插件
export { DefaultLazyLoadPlugin } from './LazyLoadPlugin';
export type { LazyLoadPlugin, LazyLoadOptions } from './LazyLoadPlugin/types';
export { LAZY_LOAD_PLUGIN_TYPE } from './LazyLoadPlugin';
export { LazyComponent, LazyImage, useLazyLoad } from './LazyLoadPlugin';