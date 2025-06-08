import React, { ReactNode } from 'react';
import { PluginManager } from '../core/PluginManager';
import { LazyLoadPlugin, LazyLoadOptions } from '../plugins';

export function createLazyLoadUtils(pluginManager: PluginManager) {
  return {
    createLazyComponent: (
      component: ReactNode | (() => Promise<ReactNode>),
      options?: LazyLoadOptions
    ): React.ReactElement => {
      const lazyLoadPlugin = pluginManager.getPlugin<LazyLoadPlugin>('lazy-load');
      if (lazyLoadPlugin) {
        return lazyLoadPlugin.createLazyComponent(component, options);
      }
      return typeof component === 'function' 
        ? React.createElement('div', {}, '懒加载插件未启用') 
        : component as React.ReactElement;
    },

    createLazyImage: (
      src: string,
      alt?: string,
      options?: LazyLoadOptions & { className?: string }
    ): React.ReactElement => {
      const lazyLoadPlugin = pluginManager.getPlugin<LazyLoadPlugin>('lazy-load');
      if (lazyLoadPlugin) {
        return lazyLoadPlugin.createLazyImage(src, alt, options);
      }
      return React.createElement('img', { src, alt, className: options?.className });
    },
  };
}