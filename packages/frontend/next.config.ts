import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 启用实验性功能
  experimental: {
    // 启用 PPR (Partial Prerendering)
    // ppr: true,
    // 启用流式渲染
    // serverComponentsExternalPackages 已移动到根级别的 serverExternalPackages
  },

  distDir: 'build', // 现在会生成到 /build 目录
  
  // 外部包配置（从 experimental 移动到这里）
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
