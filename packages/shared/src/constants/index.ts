// 共享的常量
export const API_ENDPOINTS = {
  ARTICLES: '/api/articles',
  STREAM: '/api/stream',
  USERS: '/api/users',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const STREAM_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
} as const;

export const DEFAULT_PAGE_SIZE = 10;
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB