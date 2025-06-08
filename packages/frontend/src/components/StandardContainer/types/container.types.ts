import { ReactNode } from 'react';
import { BaseContainerProps } from '../core/types';
import { UtilsTypes } from './utils.types';

export interface StandardContainerProps extends BaseContainerProps {
  isLoading?: boolean;
  fallback?: ReactNode;
  errorCapture?: ReactNode;
}

export interface StandardContainerState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export interface StandardContainerUtils extends 
  UtilsTypes.TrackingUtils, 
  UtilsTypes.MonitoringUtils, 
  UtilsTypes.LazyLoadUtils, 
  UtilsTypes.PluginUtils {}