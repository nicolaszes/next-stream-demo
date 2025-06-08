import { useState, useCallback } from 'react';
import { ErrorInfo } from 'react';

export function useErrorCapture() {
  const [error, setError] = useState<Error | null>(null);
  const [errorInfo, setErrorInfo] = useState<ErrorInfo | null>(null);

  const captureError = useCallback((error: Error, errorInfo: ErrorInfo) => {
    setError(error);
    setErrorInfo(errorInfo);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
    setErrorInfo(null);
  }, []);

  return {
    error,
    errorInfo,
    hasError: error !== null,
    captureError,
    clearError,
  };
}