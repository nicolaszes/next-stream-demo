import { ReactNode, ReactElement } from 'react';
import { BasePlugin } from '../base/BasePlugin';
import { LAZY_LOAD_PLUGIN_TYPE } from './constants';

export interface LazyLoadOptions {
  rootMargin?: string; // 根边距，默认 '50px'
  threshold?: number | number[]; // 触发阈值，默认 0.1
  triggerOnce?: boolean; // 是否只触发一次，默认 true
  placeholder?: ReactNode; // 占位符组件
  fallback?: ReactNode; // 加载失败时的回退组件
  onLoad?: () => void; // 加载完成回调
  onError?: (error: Error) => void; // 加载失败回调
}

export interface LazyLoadPlugin extends BasePlugin {
  type: typeof LAZY_LOAD_PLUGIN_TYPE;
  createLazyComponent: (
    component: ReactNode | (() => Promise<ReactNode>),
    options?: LazyLoadOptions
  ) => ReactElement;
  createLazyImage: (
    src: string,
    alt?: string,
    options?: LazyLoadOptions & { className?: string }
  ) => ReactElement;
}