import React, { ReactNode, useState, useEffect } from 'react';
import { LazyLoadOptions } from '../types';
import { useLazyLoad } from '../hooks/useLazyLoad';

export interface LazyComponentProps {
  component: ReactNode | (() => Promise<ReactNode>);
  options?: LazyLoadOptions;
}

export function LazyComponent({ component, options = {} }: LazyComponentProps) {
  const { placeholder, fallback } = options;
  const {
    elementRef,
    isIntersecting,
    isLoaded,
    hasError,
    error,
    handleLoad,
    handleError,
  } = useLazyLoad(options);

  const [loadedComponent, setLoadedComponent] = useState<ReactNode>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isIntersecting && !isLoaded && !loading && !hasError) {
      setLoading(true);
      
      if (typeof component === 'function') {
        // 异步组件
        (component as () => Promise<ReactNode>)()
          .then((comp) => {
            setLoadedComponent(comp);
            handleLoad();
          })
          .catch((err) => {
            handleError(err instanceof Error ? err : new Error('Component load failed'));
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        // 同步组件
        setLoadedComponent(component);
        handleLoad();
        setLoading(false);
      }
    }
  }, [isIntersecting, isLoaded, loading, hasError, component, handleLoad, handleError]);

  if (hasError) {
    return (
      <div ref={elementRef}>
        {fallback || (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            组件加载失败: {error?.message}
          </div>
        )}
      </div>
    );
  }

  if (!isIntersecting || loading) {
    return (
      <div ref={elementRef}>
        {placeholder || (
          <div className="animate-pulse bg-gray-200 h-32 w-full flex items-center justify-center">
            {loading ? '加载中...' : '等待加载...'}
          </div>
        )}
      </div>
    );
  }

  return <div ref={elementRef}>{loadedComponent}</div>;
}