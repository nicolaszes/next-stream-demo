import { ReactNode, ErrorInfo } from 'react';
import { ERROR_CAPTURE_PLUGIN_TYPE } from './constants';
// 修复导入路径
import { BasePlugin } from '../base/BasePlugin';

export interface ErrorCapturePlugin extends BasePlugin {
  type: typeof ERROR_CAPTURE_PLUGIN_TYPE;
  onError: (error: Error, errorInfo: ErrorInfo, componentName?: string) => void;
  renderFallback?: (error: Error, errorInfo: ErrorInfo, componentName?: string) => ReactNode;
}