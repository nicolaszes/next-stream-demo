import { ReactNode, ErrorInfo } from 'react';
// 错误的导入路径
import { BasePlugin } from '../BasePlugin'; // 这个路径不存在

// 应该修改为
import { BasePlugin } from '../base/BasePlugin';

export interface ErrorCapturePlugin extends BasePlugin {
  type: typeof ERROR_CAPTURE_PLUGIN_TYPE;
  onError: (error: Error, errorInfo: ErrorInfo, componentName?: string) => void;
  renderFallback?: (error: Error, errorInfo: ErrorInfo, componentName?: string) => ReactNode;
}