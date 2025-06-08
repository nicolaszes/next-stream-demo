// 共享的工具函数
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// 修复 delay 函数，使其在 Node.js 和浏览器环境都能工作
export const delay = (ms: number): Promise<void> => {
  // @ts-expect-error
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};