import { PluginManager } from '../core/PluginManager';
import { TrackingPlugin, TrackingEvent } from '../plugins/TrackingPlugin/types';

export function createTrackingUtils(pluginManager: PluginManager, componentName: string) {
  return {
    track: (event: Omit<TrackingEvent, 'componentName'>): void => {
      const trackingPlugins = pluginManager.getPluginsByType<TrackingPlugin>('tracking');
      trackingPlugins.forEach((plugin) => plugin.track(event, componentName));
    },
  };
}