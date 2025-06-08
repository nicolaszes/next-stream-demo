// 移动并重命名 BasePlugin
export interface BasePlugin {
  type: string;
  name: string;
  enabled: boolean;
  initialize: (componentName: string) => void;
}