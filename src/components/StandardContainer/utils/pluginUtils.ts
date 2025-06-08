import { PluginManager } from '../core/PluginManager';

export function createPluginUtils(pluginManager: PluginManager) {
  return {
    enablePlugin: (type: string, name?: string): boolean => {
      return pluginManager.enablePlugin(type, name);
    },
    
    disablePlugin: (type: string, name?: string): boolean => {
      return pluginManager.disablePlugin(type, name);
    },
    
    togglePlugin: (type: string, name?: string): boolean => {
      return pluginManager.togglePlugin(type, name);
    },
    
    isPluginEnabled: (type: string, name?: string): boolean => {
      return pluginManager.isPluginEnabled(type, name);
    },
  };
}