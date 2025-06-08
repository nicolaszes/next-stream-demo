import { InitialData, HtmlGeneratorConfig } from '../types';

/**
 * HTML生成器类 - 负责生成首屏HTML
 */
export class HtmlGenerator {
  private config: Required<HtmlGeneratorConfig>;

  constructor(config: HtmlGeneratorConfig = {}) {
    this.config = {
      nextjsBaseUrl: config.nextjsBaseUrl || 'http://localhost:3000',
      tailwindCdnUrl: config.tailwindCdnUrl || 'https://cdn.tailwindcss.com',
      enableCache: config.enableCache ?? false,
    };
  }

  /**
   * 生成HTML头部
   */
  private generateHead(data: InitialData): string {
    return `
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${this.escapeHtml(data.article.title)} - 文章详情</title>
        <meta name="description" content="${this.escapeHtml(data.article.summary)}">
        <meta name="author" content="${this.escapeHtml(data.article.author.name)}">
        
        <!-- SEO优化 -->
        <meta property="og:title" content="${this.escapeHtml(data.article.title)}">
        <meta property="og:description" content="${this.escapeHtml(data.article.summary)}">
        <meta property="og:type" content="article">
        
        <!-- Next.js 样式 -->
        <link rel="stylesheet" href="${this.config.nextjsBaseUrl}/_next/static/css/app/layout.css">
        <link rel="stylesheet" href="${this.config.nextjsBaseUrl}/_next/static/css/app/article/page.css">
        
        <!-- Tailwind CSS -->
        <script src="${this.config.tailwindCdnUrl}"></script>
        
        ${this.generateStyles()}
    </head>`;
  }

  /**
   * 生成样式
   */
  private generateStyles(): string {
    return `
        <style>
            .hydration-pending { 
                opacity: 0.7; 
                transition: opacity 0.3s ease;
            }
            .hydration-complete { 
                opacity: 1; 
                transition: opacity 0.3s ease; 
            }
            .loading-skeleton { 
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: loading 1.5s infinite;
            }
            @keyframes loading {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
            .fade-in {
                animation: fadeIn 0.5s ease-in;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        </style>`;
  }

  /**
   * 生成页面头部
   */
  private generateHeader(): string {
    return `
      <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div class="max-w-4xl mx-auto px-4 py-4">
              <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                      <button class="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="返回">
                          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                          </svg>
                      </button>
                      <h1 class="text-lg font-semibold text-gray-900">文章详情</h1>
                  </div>
                  <div id="header-actions" class="hydration-pending">
                      <!-- 这部分将由 Next.js 水合后填充 -->
                  </div>
              </div>
          </div>
      </header>`;
  }

  /**
   * 生成文章头部信息
   */
  private generateArticleHeader(data: InitialData): string {
    const { article } = data;
    return `
      <div class="bg-white">
          <div class="max-w-4xl mx-auto px-4 py-6">
              <h1 class="text-2xl font-bold text-gray-900 mb-4 leading-tight">${this.escapeHtml(article.title)}</h1>
              <div class="flex items-center justify-between text-sm text-gray-600 mb-6">
                  <div class="flex items-center space-x-4">
                      <div class="flex items-center space-x-2">
                          <img src="${article.author.avatar}" alt="${this.escapeHtml(
      article.author.name
    )}" class="w-6 h-6 rounded-full">
                          <span class="font-medium">作者：${this.escapeHtml(article.author.name)}</span>
                          ${article.author.verified ? '<span class="text-blue-500">✓</span>' : ''}
                      </div>
                      <span class="text-gray-400">•</span>
                      <span>${article.publishTime}</span>
                      <span class="text-gray-400">•</span>
                      <span>${article.readCount.toLocaleString()}阅读</span>
                  </div>
              </div>
          </div>
      </div>`;
  }

  /**
   * 生成内容占位符
   */
  private generateContentPlaceholder(): string {
    return `
      <div id="article-content" class="hydration-pending">
          <div class="max-w-4xl mx-auto px-4 py-6">
              <div class="bg-white rounded-lg shadow-sm p-6">
                  <div class="space-y-4">
                      <div class="loading-skeleton h-4 rounded"></div>
                      <div class="loading-skeleton h-4 rounded w-3/4"></div>
                      <div class="loading-skeleton h-4 rounded w-1/2"></div>
                      <div class="loading-skeleton h-32 rounded"></div>
                      <div class="loading-skeleton h-4 rounded w-5/6"></div>
                  </div>
                  <div class="text-center text-gray-500 text-sm mt-6">
                      <div class="inline-flex items-center space-x-2">
                          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
                          <span>正在加载内容...</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>`;
  }

  /**
   * 生成脚本
   */
  private generateScripts(data: InitialData): string {
    // 检查是否为开发环境
    const isDev = process.env.NODE_ENV !== 'production';

    if (!isDev) {
      // 开发环境：简化脚本加载，避免404错误
      return `
          <!-- 初始数据注入 -->
          <script id="initial-data" type="application/json">
              ${JSON.stringify(data)}
          </script>
  
          <!-- 水合标记 -->
          <script>
              window.__HYDRATION_READY__ = true;
              window.__INITIAL_DATA__ = ${JSON.stringify(data)};
              window.__HYDRATION_CONFIG__ = {
                  enableCache: ${this.config.enableCache},
                  version: '${data.meta.version}'
              };
              
              // 开发环境：简化水合逻辑
              window.addEventListener('DOMContentLoaded', function() {
                  console.log('🚀 开发环境：页面加载完成');
                  
                  // 移除加载状态
                  const pendingElements = document.querySelectorAll('.hydration-pending');
                  pendingElements.forEach(el => {
                      el.classList.remove('hydration-pending');
                      el.classList.add('hydration-complete');
                  });
                  
                  // 模拟内容加载
                  setTimeout(() => {
                      const contentEl = document.getElementById('article-content');
                      if (contentEl) {
                          contentEl.innerHTML = '<div class="max-w-4xl mx-auto px-4 py-6"><div class="bg-white rounded-lg shadow-sm p-6"><p class="text-gray-700 leading-relaxed">内容正在通过 CSR 方式加载...</p></div></div>';
                      }
                  }, 1000);
              });
          </script>`;
    } else {
      // 生产环境：完整的Next.js资源加载
      return `
          <!-- 初始数据注入 -->
          <script id="initial-data" type="application/json">
              ${JSON.stringify(data)}
          </script>
  
          <!-- 水合标记 -->
          <script>
              window.__HYDRATION_READY__ = true;
              window.__INITIAL_DATA__ = ${JSON.stringify(data)};
          </script>
  
          <!-- Next.js 运行时 -->
          <script src="${this.config.nextjsBaseUrl}/_next/static/chunks/webpack.js" defer></script>
          <script src="${this.config.nextjsBaseUrl}/_next/static/chunks/main.js" defer></script>
          <script src="${this.config.nextjsBaseUrl}/_next/static/chunks/pages/_app.js" defer></script>
          <script src="${this.config.nextjsBaseUrl}/_next/static/chunks/pages/article.js" defer></script>
          
          <!-- 启动水合 -->
          <script>
              window.addEventListener('DOMContentLoaded', function() {
                  console.log('🚀 DOM 加载完成，准备启动 Next.js 水合');
                  setTimeout(function() {
                      if (window.__START_HYDRATION__) {
                          window.__START_HYDRATION__();
                      }
                  }, 500);
              });
          </script>`;
    }
  }

  /**
   * HTML转义
   */
  private escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }

  /**
   * 生成页面主体内容
   */
  private generateBody(data: InitialData): string {
    return `
      <body>
          <div id="__next">
              <div class="min-h-screen bg-gray-50">
                  ${this.generateHeader()}
                  ${this.generateArticleHeader(data)}
                  ${this.generateContentPlaceholder()}
              </div>
          </div>
          
          ${this.generateScripts(data)}
      </body>`;
  }

  /**
   * 生成完整的HTML
   */
  generateHTML(data: InitialData): string {
    return `<!DOCTYPE html>
<html lang="zh-CN">
${this.generateHead(data)}
${this.generateBody(data)}
</html>`;
  }
}
