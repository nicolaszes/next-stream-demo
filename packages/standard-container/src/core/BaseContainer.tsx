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

    // 初始化插件管理器
    this.pluginManager = new PluginManager([]);
    this.initializePlugins(props, defaultPlugins);
  }

  static getDerivedStateFromError(error: Error): BaseContainerState {
    return { hasError: true, error, errorInfo: null };
  }

  // 监听 props 变化
  componentDidUpdate(prevProps: P) {
    // 检查 plugins 是否发生变化
    const pluginsChanged = JSON.stringify(prevProps.plugins) !== JSON.stringify(this.props.plugins);

    if (pluginsChanged) {
      // 重新初始化插件（需要传入 defaultPlugins，这里需要子类提供）
      this.reinitializePlugins();
    }
  }

  // 抽象方法，子类需要实现以提供默认插件
  protected abstract getDefaultPlugins(): PluginConfig;

  // 提取插件初始化逻辑
  private initializePlugins(props: P, defaultPlugins: PluginConfig) {
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

    // 重新初始化插件管理器
    this.pluginManager = new PluginManager(finalPlugins);
    this.pluginManager.initializePlugins(this.componentName);
  }

  // 重新初始化插件的方法
  protected reinitializePlugins() {
    this.initializePlugins(this.props, this.getDefaultPlugins());
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
