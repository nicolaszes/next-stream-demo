import { BasePlugin } from '../plugins';
import type { PluginConfig } from './types';

export class PluginManager {
  private plugins: BasePlugin[];

  constructor(plugins: PluginConfig = []) {
    this.plugins = plugins.map(plugin => ({
      ...plugin, 
      enabled: plugin.enabled ?? true
    }));
  }

  // 通用的获取插件方法 - 只返回启用的插件
  getPlugin<T extends BasePlugin>(type: string): T | undefined {
    return this.plugins.find(plugin => plugin.type === type && plugin.enabled !== false) as T | undefined;
  }

  // 获取指定类型的所有启用插件
  getPluginsByType<T extends BasePlugin>(type: string): T[] {
    return this.plugins.filter(plugin => plugin.type === type && plugin.enabled !== false) as T[];
  }

  // 启用插件
  enablePlugin(type: string, name?: string): boolean {
    const plugin = this.findPlugin(type, name);
    if (plugin) {
      plugin.enabled = true;
      return true;
    }
    return false;
  }

  // 禁用插件
  disablePlugin(type: string, name?: string): boolean {
    const plugin = this.findPlugin(type, name);
    if (plugin) {
      plugin.enabled = false;
      return true;
    }
    return false;
  }

  // 切换插件状态
  togglePlugin(type: string, name?: string): boolean {
    const plugin = this.findPlugin(type, name);
    if (plugin) {
      plugin.enabled = !plugin.enabled;
      return plugin.enabled;
    }
    return false;
  }

  // 检查插件是否启用
  isPluginEnabled(type: string, name?: string): boolean {
    const plugin = this.findPlugin(type, name);
    return plugin ? plugin.enabled !== false : false;
  }

  // 私有方法：查找插件
  private findPlugin(type: string, name?: string): BasePlugin | undefined {
    return this.plugins.find(plugin => 
      plugin.type === type && (!name || plugin.name === name)
    );
  }

  addPlugin(plugin: BasePlugin): void {
    if (!this.plugins.find(p => p.type === plugin.type && p.name === plugin.name)) {
      this.plugins.push({ ...plugin, enabled: plugin.enabled ?? true });
    }
  }

  removePlugin(type: string, name?: string): void {
    this.plugins = this.plugins.filter(plugin => 
      plugin.type !== type || (name && plugin.name !== name)
    );
  }

  getAllPlugins(): BasePlugin[] {
    return [...this.plugins];
  }

  // 只初始化启用的插件
  initializePlugins(componentName: string): void {
    this.plugins
      .filter(plugin => plugin.enabled !== false)
      .forEach(plugin => {
        if (plugin.initialize && typeof plugin.initialize === 'function') {
          plugin.initialize(componentName);
        }
      });
  }
}

// 导出类型
export type { PluginConfig };