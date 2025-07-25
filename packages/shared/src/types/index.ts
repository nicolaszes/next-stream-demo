// 共享的类型定义
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: number;
}

export interface StreamData {
  id: string;
  type: 'text' | 'image' | 'video';
  content: string;
  timestamp: number;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;

  summary: string;
  publishTime: string;
  readCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}