// 文章相关类型定义
export interface Author {
  name: string;
  avatar: string;
  verified: boolean;
}

export interface Article {
  title: string;
  author: Author;
  publishTime: string;
  readCount: number;
  summary: string;
}

export interface Meta {
  timestamp: number;
  version: string;
}

export interface InitialData {
  article: Article;
  meta: Meta;
}

export interface HtmlGeneratorConfig {
  nextjsBaseUrl?: string;
  tailwindCdnUrl?: string;
  enableCache?: boolean;
}