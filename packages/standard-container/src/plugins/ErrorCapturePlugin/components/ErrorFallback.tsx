import React from 'react';
import { ErrorInfo } from 'react';

interface ErrorFallbackProps {
  error: Error;
  errorInfo: ErrorInfo;
  componentName?: string;
  onRetry?: () => void;
}

export function ErrorFallback({ error, errorInfo, componentName, onRetry }: ErrorFallbackProps) {
  return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      <strong className="font-bold">Error in {componentName || 'Component'}:</strong>
      <span className="block sm:inline"> {error.message}</span>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          重试
        </button>
      )}
      {process.env.NODE_ENV === 'development' && (
        <details className="mt-2 text-sm">
          <summary>Details</summary>
          <pre className="mt-1 whitespace-pre-wrap">{errorInfo.componentStack}</pre>
        </details>
      )}
    </div>
  );
}