import { useCallback, useRef } from 'react';
import { TrackingEvent } from '../types';

export interface UseTrackingOptions {
  componentName?: string;
  autoTrack?: boolean;
}

export interface UseTrackingReturn {
  track: (event: Omit<TrackingEvent, 'timestamp'>) => void;
  trackClick: (elementName: string, properties?: Record<string, unknown>) => void;
  trackView: (viewName: string, properties?: Record<string, unknown>) => void;
  trackCustom: (eventName: string, properties?: Record<string, unknown>) => void;
}

export function useTracking(options: UseTrackingOptions = {}): UseTrackingReturn {
  const { componentName, autoTrack = true } = options;
  const trackingRef = useRef<Set<string>>(new Set());

  const track = useCallback((event: Omit<TrackingEvent, 'timestamp'>) => {
    const trackingEvent: TrackingEvent = {
      ...event,
      timestamp: Date.now(),
    };

    // 这里可以集成实际的埋点服务
    console.log('Tracking:', {
      ...trackingEvent,
      componentName,
    });
  }, [componentName]);

  const trackClick = useCallback((elementName: string, properties?: Record<string, unknown>) => {
    track({
      eventName: 'click',
      properties: {
        element: elementName,
        ...properties,
      },
    });
  }, [track]);

  const trackView = useCallback((viewName: string, properties?: Record<string, unknown>) => {
    const eventKey = `view_${viewName}`;
    if (autoTrack && trackingRef.current.has(eventKey)) {
      return; // 避免重复埋点
    }
    
    trackingRef.current.add(eventKey);
    track({
      eventName: 'view',
      properties: {
        view: viewName,
        ...properties,
      },
    });
  }, [track, autoTrack]);

  const trackCustom = useCallback((eventName: string, properties?: Record<string, unknown>) => {
    track({
      eventName,
      properties,
    });
  }, [track]);

  return {
    track,
    trackClick,
    trackView,
    trackCustom,
  };
}