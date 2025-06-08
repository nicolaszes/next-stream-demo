import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import ArticleHeader from './components/ArticleHeader';
import ArticleContent from './components/ArticleContent';
import ArticleActions from './components/ArticleActions';
import RelatedArticles from './components/RelatedArticles';
import LoadingSkeleton from '../../components/LoadingSkeleton';

// 动态导入混合渲染组件，但允许 SSR
const HybridStandardContainer = dynamic(
  () => import('../../components/HybridStandardContainer'),
  { ssr: true } // 允许 SSR
);

export default function ArticleDetailPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <button className="p-2 -ml-2 rounded-full hover:bg-gray-100">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm text-gray-600">资讯详情</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
              </svg>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 110 2zm0 7a1 1 0 110-2 1 1 0 110 2zm0 7a1 1 0 110-2 1 1 0 110 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* 文章内容区域 */}
      <div className="bg-white">
        {/* SSR 渲染 + 客户端插件激活 */}
        <HybridStandardContainer
          componentName="ArticleHeader"
          fallback={<LoadingSkeleton type="article-header" />}
          enablePluginsOnClient={true}
        >
          <ArticleHeader />
        </HybridStandardContainer>

        {/* 文章正文内容 - 流式加载 */}
        <Suspense fallback={<LoadingSkeleton type="article-content" />}>
          <ArticleContent />
        </Suspense>

        {/* 文章操作栏 */}
        <ArticleActions />
      </div>

      {/* 相关推荐 - 流式加载 */}
      <section className="mt-2 bg-white">
        <Suspense fallback={<LoadingSkeleton type="related-articles" />}>
          <RelatedArticles />
        </Suspense>
      </section>
    </main>
  );
}
