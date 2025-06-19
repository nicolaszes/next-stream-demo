import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 启用实验性功能
  experimental: {
    // 启用流式渲染和部分预渲染
    // ppr: true,
  },
  
  // 外部包配置
  serverExternalPackages: [],
  
  // 优化静态资源
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.toutiaoimg.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // 编译优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // 启用 gzip 压缩
  compress: true,
  
  // 静态优化
  trailingSlash: false,
  
  // 配置 CORS 头部，允许 backend 加载资源
  async headers() {
    return [
      {
        source: '/_next/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://localhost:3003',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ]
  },
  
  // 移除 rewrites，改用服务端获取方式
  // async rewrites() {
  //   return [
  //     {
  //       source: '/article',
  //       destination: 'http://localhost:3003/article',
  //     }
  //   ]
  // },
  
  // Turbopack 配置
  turbopack: {
    // 优化开发体验
  },
}

export default nextConfig