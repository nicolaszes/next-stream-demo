import { TRACKING_PLUGIN_TYPE } from './constants';
import { TrackingEvent } from './types';
import { BasePlugin } from '../base/BasePlugin';
import { initializePlugin } from '../base/pluginInitializer';

export class TrackingPlugin implements BasePlugin {
  type: typeof TRACKING_PLUGIN_TYPE = TRACKING_PLUGIN_TYPE;
  name = 'TrackingPlugin';
  enabled: boolean;

  constructor(enabled: boolean = true) {
    this.enabled = enabled;
  }

  initialize(componentName: string) {
    initializePlugin(this, componentName, '用户行为追踪功能');
    
    if (this.enabled) {
      console.log(`TrackingPlugin initialized for ${componentName}`);
    }
  }

  track(event: TrackingEvent, componentName: string) {
    if (!this.enabled) return;
    
    const trackingEvent = {
      ...event,
      componentName,
      timestamp: new Date().toISOString(),
    };
    
    // 删除注释掉的代码
    console.log('Tracking event:', trackingEvent);
  }
}

export const DefaultTrackingPlugin = TrackingPlugin;