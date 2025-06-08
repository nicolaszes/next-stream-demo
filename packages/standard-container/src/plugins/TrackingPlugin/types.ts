import { BasePlugin } from '../base/BasePlugin';
import { TRACKING_PLUGIN_TYPE } from './constants';

export interface TrackingEvent {
  eventName: string;
  properties?: Record<string, unknown>;
  timestamp?: number;
}

export interface TrackingPlugin extends BasePlugin {
  type: typeof TRACKING_PLUGIN_TYPE;
  track: (event: TrackingEvent, componentName?: string) => void;
}