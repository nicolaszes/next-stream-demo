'use client';

import React, { useEffect, useState, ReactNode, useRef } from 'react';
// 将原来的相对导入
// import { StandardContainer } from './StandardContainer';

// 更新为包导入
import StandardContainer from '@next-stream-demo/standard-container';
import {
  BasePlugin,
  DefaultErrorCapturePlugin,
  DefaultLazyLoadPlugin,
} from '@next-stream-demo/standard-container';

console.log(15, StandardContainer)

// 渐进式增强 Hook
function useProgressiveEnhancement(enablePluginsOnClient: boolean) {
  const [hydrationState, setHydrationState] = useState<'ssr' | 'hydrating' | 'enhanced'>('ssr');
  const [plugins, setPlugins] = useState<BasePlugin[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 标记开始水合
    setHydrationState('hydrating');

    if (enablePluginsOnClient) {
      // 使用 requestIdleCallback 或 setTimeout 在空闲时初始化插件
      const enhanceWithPlugins = () => {
        console.log('🔥 开始渐进式增强，初始化插件');
        setPlugins([new DefaultErrorCapturePlugin(true), new DefaultLazyLoadPlugin(true)]);
        setHydrationState('enhanced');
      };

      if ('requestIdleCallback' in window) {
        const id = requestIdleCallback(enhanceWithPlugins, { timeout: 1000 });
        return () => cancelIdleCallback(id);
      } else {
        const timer = setTimeout(enhanceWithPlugins, 100);
        return () => clearTimeout(timer);
      }
    } else {
      setHydrationState('enhanced');
    }
  }, [enablePluginsOnClient]);

  return { hydrationState, plugins, containerRef };
}

interface HybridStandardContainerProps {
  children: ReactNode;
  componentName: string;
  fallback?: ReactNode;
  enablePluginsOnClient?: boolean;
}

export default function HybridStandardContainer({
  children,
  componentName,
  fallback,
  enablePluginsOnClient = true,
}: HybridStandardContainerProps) {
  const { hydrationState, plugins, containerRef } = useProgressiveEnhancement(enablePluginsOnClient);

  console.log(`🔍 HybridStandardContainer 状态: ${hydrationState}`);

  return (
    <div ref={containerRef} data-hydration-state={hydrationState}>
      <StandardContainer plugins={plugins} fallback={fallback} componentName={componentName}>
        {children}
      </StandardContainer>
    </div>
  );
}
