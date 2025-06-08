import { DefaultErrorCapturePlugin } from '../plugins/ErrorCapturePlugin/index';
import { DefaultTrackingPlugin } from '../plugins/TrackingPlugin';
import { DefaultMonitoringPlugin } from '../plugins/MonitoringPlugin';
import { DefaultLazyLoadPlugin } from '../plugins/LazyLoadPlugin';

export const DEFAULT_PLUGINS = [
  new DefaultErrorCapturePlugin(false),
  new DefaultTrackingPlugin(false),
  new DefaultMonitoringPlugin(false),
  new DefaultLazyLoadPlugin(false),
] as const;

export const PLUGIN_PRIORITIES = {
  ERROR_CAPTURE: 1,
  TRACKING: 2,
  MONITORING: 3,
  LAZY_LOAD: 4,
} as const;