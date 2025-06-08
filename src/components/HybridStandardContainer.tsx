'use client';

import React, { useEffect, useState, ReactNode } from 'react';
import { StandardContainer } from './StandardContainer/default';
import { DefaultErrorCapturePlugin, DefaultLazyLoadPlugin } from './StandardContainer/plugins';
// import { BasePlugin } from './StandardContainer/plugins/base/BasePlugin';

// 自定义 Hook 处理客户端检测
function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
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
  const isClient = useIsClient();
  
  // 同步计算插件，确保在渲染时就有正确的值
  const plugins = React.useMemo(() => {
    if (isClient && enablePluginsOnClient) {
      // console.log('🔥 客户端环境，准备插件');
      return [
        new DefaultErrorCapturePlugin(true),
        new DefaultLazyLoadPlugin(true)
      ];
    }
    // console.log('🔍 SSR 环境，使用空插件');
    return [];
  }, [isClient, enablePluginsOnClient]);

  return (
    <StandardContainer
      plugins={plugins}
      fallback={fallback}
      componentName={componentName}
    >
      {children}
    </StandardContainer>
  );
}
