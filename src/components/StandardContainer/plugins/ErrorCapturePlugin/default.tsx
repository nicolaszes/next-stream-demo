import { ReactNode, ErrorInfo } from 'react';
import { ERROR_CAPTURE_PLUGIN_TYPE } from './constants';
import { BasePlugin } from '../base/BasePlugin';
import { initializePlugin } from '../base/pluginInitializer';

export class ErrorCapturePlugin implements BasePlugin {
  type = 'errorCapture' as const;
  name = 'ErrorCapturePlugin';
  enabled: boolean;

  constructor(enabled: boolean = true) {
    this.enabled = enabled;
  }

  initialize(componentName: string) {
    console.log('🔥 ErrorCapturePlugin initialize 被调用了！', componentName);
    initializePlugin(this, componentName, '错误捕获功能');
    
    if (this.enabled) {
      console.log(`ErrorCapturePlugin initialized for ${componentName}`);
    }
  }
}

export class DefaultErrorCapturePlugin extends ErrorCapturePlugin {
  type: typeof ERROR_CAPTURE_PLUGIN_TYPE = ERROR_CAPTURE_PLUGIN_TYPE;
  name = 'DefaultErrorCapture';

  onError(error: Error, errorInfo: ErrorInfo, componentName?: string): void {
    console.error(`[${componentName || 'StandardContainer'}] Component Error:`, error);
    console.error(`[${componentName || 'StandardContainer'}] Error Info:`, errorInfo);
    // 在这里添加通用的错误上报逻辑，例如发送到 Sentry
  }

  renderFallback(error: Error, errorInfo: ErrorInfo, componentName?: string): ReactNode {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <strong className="font-bold">Error in {componentName || 'Component'}:</strong>
        <span className="block sm:inline"> {error.message}</span>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-2 text-sm">
            <div>Details</div>
            <pre className="mt-1 whitespace-pre-wrap">{errorInfo.componentStack}</pre>
          </div>
        )}
      </div>
    );
  }
}