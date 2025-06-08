import { useState, useEffect, useRef, useCallback } from 'react';
import { LazyLoadOptions } from '../types';

export interface UseLazyLoadReturn {
  elementRef: React.RefObject<HTMLDivElement>;
  isIntersecting: boolean;
  isLoaded: boolean;
  hasError: boolean;
  error: Error | null;
  handleLoad: () => void;
  handleError: (error: Error) => void;
  reset: () => void;
}

export function useLazyLoad(options: LazyLoadOptions = {}): UseLazyLoadReturn {
  const {
    rootMargin = '50px',
    threshold = 0.1,
    triggerOnce = true,
    onLoad,
    onError
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [rootMargin, threshold, triggerOnce]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
    setError(null);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback((err: Error) => {
    setHasError(true);
    setError(err);
    onError?.(err);
  }, [onError]);

  const reset = useCallback(() => {
    setIsIntersecting(false);
    setIsLoaded(false);
    setHasError(false);
    setError(null);
  }, []);

  return {
    elementRef: elementRef as React.RefObject<HTMLDivElement>,
    isIntersecting,
    isLoaded,
    hasError,
    error,
    handleLoad,
    handleError,
    reset,
  };
}