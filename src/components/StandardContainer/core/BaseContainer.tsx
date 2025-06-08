'use client';

import { Component, ReactNode } from 'react';
import { PluginManager } from './PluginManager';
import type { BaseContainerProps, BaseContainerState, PluginConfig } from './types';

export abstract class BaseContainer<
  P extends BaseContainerProps = BaseContainerProps,
  S extends BaseContainerState = BaseContainerState
> extends Component<P, S> {
  protected pluginManager: PluginManager;
  protected componentName: string;

  constructor(props: P, defaultPlugins: PluginConfig = []) {
    super(props);

    this.componentName = props.componentName || 'UnnamedComponent';

    // 合并默认插件和外部传入插件
    const finalPlugins = [...defaultPlugins];
    if (props.plugins) {
      props.plugins.forEach((customPlugin) => {
        const existingPluginIndex = finalPlugins.findIndex(
          (p) => p.type === customPlugin.type && p.name === customPlugin.name
        );
        if (existingPluginIndex !== -1) {
          finalPlugins[existingPluginIndex] = customPlugin;
        } else {
          finalPlugins.push(customPlugin);
        }
      });
    }

    this.pluginManager = new PluginManager(finalPlugins);
    this.pluginManager.initializePlugins(this.componentName);
  }

  static getDerivedStateFromError(error: Error): BaseContainerState {
    return { hasError: true, error, errorInfo: null };
  }

  // 插件控制方法
  protected enablePlugin = (type: string, name?: string): boolean => {
    return this.pluginManager.enablePlugin(type, name);
  };

  protected disablePlugin = (type: string, name?: string): boolean => {
    return this.pluginManager.disablePlugin(type, name);
  };

  protected togglePlugin = (type: string, name?: string): boolean => {
    return this.pluginManager.togglePlugin(type, name);
  };

  protected isPluginEnabled = (type: string, name?: string): boolean => {
    return this.pluginManager.isPluginEnabled(type, name);
  };

  abstract render(): ReactNode;
}

// 导出类型
export type { BaseContainerProps, BaseContainerState };
