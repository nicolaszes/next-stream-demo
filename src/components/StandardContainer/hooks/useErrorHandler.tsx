import { useMemo } from 'react';
import { ErrorInfo } from 'react';
import { PluginManager } from '../core/PluginManager';
import { ErrorCapturePlugin } from '../plugins';

export function useErrorHandler(pluginManager: PluginManager, componentName: string) {
  return useMemo(() => ({
    renderErrorFallback: (error: Error | null, errorInfo: ErrorInfo | null) => {
      if (!error || !errorInfo) return null;
      
      const errorPlugin = pluginManager.getPlugin<ErrorCapturePlugin>('error-capture');
      if (errorPlugin?.renderFallback) {
        return errorPlugin.renderFallback(error, errorInfo, componentName);
      }
      
      return <div>Something went wrong in {componentName}.</div>;
    },
    
    handleError: (error: Error, errorInfo: ErrorInfo) => {
      const errorPlugins = pluginManager.getPluginsByType<ErrorCapturePlugin>('error-capture');
      errorPlugins.forEach((plugin) => plugin.onError(error, errorInfo, componentName));
    }
  }), [pluginManager, componentName]);
}