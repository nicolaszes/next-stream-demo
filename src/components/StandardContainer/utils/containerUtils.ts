// 容器相关的通用工具函数
export function validateComponentName(name: string): boolean {
  return typeof name === 'string' && name.length > 0;
}

export function createComponentId(name: string): string {
  return `container-${name}-${Date.now()}`;
}

export function formatErrorMessage(error: Error, componentName: string): string {
  return `[${componentName}] ${error.message}`;
}