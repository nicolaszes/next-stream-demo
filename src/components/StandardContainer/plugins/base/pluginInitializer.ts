import { BasePlugin } from './BasePlugin';

/**
 * 插件初始化公共方法
 * @param plugin 插件实例
 * @param componentName 组件名称
 * @param additionalInfo 额外信息（可选）
 */
export function initializePlugin(
  plugin: BasePlugin,
  componentName: string,
  additionalInfo?: string
): void {
  const timestamp = new Date().toISOString();
  const status = plugin.enabled ? '已启用' : '已禁用';
  const info = additionalInfo ? ` - ${additionalInfo}` : '';
  
  console.log(
    `[${timestamp}] 插件初始化: ${plugin.name} | 组件: ${componentName} | 状态: ${status}${info}`
  );
}

/**
 * 批量初始化插件
 * @param plugins 插件数组
 * @param componentName 组件名称
 */
export function initializePlugins(
  plugins: BasePlugin[],
  componentName: string
): void {
  plugins.forEach(plugin => {
    if (plugin.enabled) {
      initializePlugin(plugin, componentName);
      plugin.initialize(componentName);
    }
  });
}