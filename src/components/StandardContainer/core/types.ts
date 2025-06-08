import { ReactNode, ErrorInfo } from 'react';
import { BasePlugin } from '../plugins';

// 插件配置类型
export type PluginConfig = BasePlugin[];

// 从 BaseContainer.tsx 中提取的类型
export interface BaseContainerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactNode | ((utils: any) => ReactNode);
  plugins?: PluginConfig;
  componentName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// 基础容器状态
export interface BaseContainerState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// 基础容器工具函数
export interface BaseContainerUtils {
  enablePlugin: (type: string, name?: string) => boolean;
  disablePlugin: (type: string, name?: string) => boolean;
  togglePlugin: (type: string, name?: string) => boolean;
  isPluginEnabled: (type: string, name?: string) => boolean;
}

// 可扩展的容器工具函数
export interface ExtendableContainerUtils extends BaseContainerUtils {
  [key: string]: unknown;
}
