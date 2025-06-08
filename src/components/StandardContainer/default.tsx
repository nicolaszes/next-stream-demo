"use client";

import React, { ReactNode, Suspense, ErrorInfo } from 'react';
import { BaseContainer } from './core/BaseContainer';
import { StandardContainerProps } from './types';
import { DEFAULT_PLUGINS } from './constants';
import { createPluginUtils } from './utils/pluginUtils';
import { createTrackingUtils } from './utils/trackingUtils';
import { createMonitoringUtils } from './utils/monitoringUtils';
import { createLazyLoadUtils } from './utils/lazyLoadUtils';

export class StandardContainer extends BaseContainer<StandardContainerProps> {
  constructor(props: StandardContainerProps) {
    // 如果外部传入了plugins，直接使用；否则使用默认插件
    const finalPlugins = props.plugins || DEFAULT_PLUGINS;
    
    super(props, [...finalPlugins]);
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo });

    // Get error capture plugin directly
    const errorPlugin = this.pluginManager.getPlugin('error-capture');
    if (errorPlugin && 'onError' in errorPlugin) {
      (errorPlugin as { onError: (error: Error, errorInfo: ErrorInfo, componentName: string) => void }).onError(
        error,
        errorInfo,
        this.componentName
      );
    }
  }

  private getUtils() {
    const pluginUtils = createPluginUtils(this.pluginManager);
    const trackingUtils = createTrackingUtils(this.pluginManager, this.componentName);
    const monitoringUtils = createMonitoringUtils(this.pluginManager, this.componentName);
    const lazyLoadUtils = createLazyLoadUtils(this.pluginManager);

    return {
      ...pluginUtils,
      ...trackingUtils,
      ...monitoringUtils,
      ...lazyLoadUtils,
    };
  }

  private renderErrorFallback(error: Error | null, errorInfo: ErrorInfo | null) {
    const errorPlugin = this.pluginManager.getPlugin('error-capture');
    if (errorPlugin && 'renderFallback' in errorPlugin && errorPlugin.renderFallback) {
      return (errorPlugin as { renderFallback: (error: Error, errorInfo: ErrorInfo, componentName: string) => ReactNode }).renderFallback(error!, errorInfo!, this.componentName);
    }
    return <div>Something went wrong.</div>;
  }

  render(): ReactNode {
    const { children, isLoading, fallback, errorCapture } = this.props as StandardContainerProps;
    const { hasError } = this.state || {};
    
    const utils = this.getUtils();

    if (hasError) {
      return errorCapture || this.renderErrorFallback(this.state.error, this.state.errorInfo);
    }

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <Suspense fallback={fallback || <div>Loading component...</div>}>
        {typeof children === 'function' ? children(utils) : children}
      </Suspense>
    );
  }
}
