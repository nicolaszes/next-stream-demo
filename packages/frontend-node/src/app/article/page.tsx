import React from 'react';
import dynamic from 'next/dynamic';

import LoadingSkeleton from '@/components/LoadingSkeleton';
import HybridStandardContainer from '@/components/HybridStandardContainer';

import NavHeaderServer from '@/app/article/components/NavHeader/NavHeaderServer';
import NavHeaderHydration from '@/app/article/components/NavHeader/NavHeaderHydration';

import ArticleHeaderServer from '@/app/article/components/ArticleHeader/ArticleHeaderServer';
import ArticleHeaderHydration from '@/app/article/components/ArticleHeader/ArticleHeaderHydration';

// 关键组件立即加载
import ArticleContent from '@/app/article/components/ArticleContent/ArticleContent';

// 非关键组件延迟加载
const ArticleActions = dynamic(() => import('@/app/article/components/ArticleActions/ArticleActions'), {
  ssr: true, // 禁用 SSR，减少首屏阻塞
  loading: () => <LoadingSkeleton type="article-actions" />,
});

const ArticlesRelated = dynamic(() => import('@/app/article/components/ArticleRelated/ArticlesRelated'), {
  ssr: true,
  loading: () => <LoadingSkeleton type="articles-related" />,
});

export default function ArticleDetailPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* 导航头部 - 固定高度 */}
      <div className="h-16"> {/* 预留导航栏高度 */}
        <HybridStandardContainer componentName="Nav-Header" fallback={<LoadingSkeleton type="article-header" />}>
          <NavHeaderServer title="资讯详情" />
          <NavHeaderHydration />
        </HybridStandardContainer>
      </div>

      {/* 文章标题区域 - 预留最小高度 */}
      <div className="min-h-[120px]"> {/* 预留标题区域高度 */}
        <HybridStandardContainer componentName="Article-Header" fallback={<LoadingSkeleton type="article-header" />}>
          <ArticleHeaderServer />
          <ArticleHeaderHydration />
        </HybridStandardContainer>
      </div>

      {/* 文章正文 - 预留内容区域 */}
      <div className="min-h-[400px]"> {/* 预留文章内容最小高度 */}
        <HybridStandardContainer componentName="Article-Content-Priority" fallback={<LoadingSkeleton type="article-content" />}>
          <ArticleContent articleId="" />
        </HybridStandardContainer>
      </div>

      {/* 交互操作栏 - 固定高度 */}
      <div className="h-20"> {/* 预留操作栏高度 */}
        <HybridStandardContainer componentName="Article-Actions" fallback={<LoadingSkeleton type="article-content" />}>
          <ArticleActions />
        </HybridStandardContainer>
      </div>

      {/* 相关推荐 - 预留空间 */}
      <div className="min-h-[300px]"> {/* 预留推荐区域高度 */}
        <HybridStandardContainer componentName="Article-Related" fallback={<LoadingSkeleton type="articles-related" />}>
          <ArticlesRelated />
        </HybridStandardContainer>
      </div>
    </main>
  );
}
