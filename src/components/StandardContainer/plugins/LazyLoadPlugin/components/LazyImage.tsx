import React from 'react';
import { LazyLoadOptions } from '../types';
import { useLazyLoad } from '../hooks/useLazyLoad';

export interface LazyImageProps {
  src: string;
  alt?: string;
  options?: LazyLoadOptions & { className?: string };
}

export function LazyImage({ src, alt = '', options = {} }: LazyImageProps) {
  const { placeholder, fallback, className } = options;
  const {
    elementRef,
    isIntersecting,
    hasError,
    error,
    handleLoad,
    handleError,
  } = useLazyLoad(options);

  const handleImageLoad = () => {
    handleLoad();
  };

  const handleImageError = () => {
    handleError(new Error(`Failed to load image: ${src}`));
  };

  if (hasError) {
    return (
      <div ref={elementRef} className={className}>
        {fallback || (
          <div className="bg-gray-300 flex items-center justify-center h-32 text-gray-600">
            图片加载失败: {error?.message}
          </div>
        )}
      </div>
    );
  }

  if (!isIntersecting) {
    return (
      <div ref={elementRef} className={className}>
        {placeholder || (
          <div className="animate-pulse bg-gray-200 h-32 w-full flex items-center justify-center">
            加载中...
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={elementRef} className={className}>
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className="w-full h-auto"
      />
    </div>
  );
}