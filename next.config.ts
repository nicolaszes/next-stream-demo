/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用实验性功能
  experimental: {
    // 服务器组件
    serverComponentsExternalPackages: [],
    // 部分预渲染 (需要 Next.js 14+)
    // ppr: true,
  },
  
  // 移动端优化
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 添加允许的外部图片域名
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'https://p26-sign.toutiaoimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.toutiaoimg.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // 压缩优化
  compress: true,
  
  // PWA 支持准备
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
      ],
    },
  ],
}

module.exports = nextConfig
