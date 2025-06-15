import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Page Router 配置
  experimental: {
    // Page Router 不需要 App Router 的实验性功能
    // @ts-expect-error
    serverActions: false,
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
  
  // Page Router 重写规则
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  
  // 自定义 webpack 配置
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // 客户端代码分割优化
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          plugins: {
            name: 'plugins',
            test: /[\\/]StandardContainer[\\/]/,
            chunks: 'all',
            priority: 10,
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;