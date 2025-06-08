import { useMemo } from 'react';
import { PluginManager } from '../core/PluginManager';
import { PluginConfig } from '../core';

export function usePluginManager(plugins: PluginConfig, componentName: string) {
  return useMemo(() => {
    const manager = new PluginManager(plugins);
    manager.initializePlugins(componentName);
    return manager;
  }, [plugins, componentName]);
}