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

import AsyncArticleActions from '@/app/article/components/AsyncSections/AsyncArticleActions';
import AsyncArticlesRelated from '@/app/article/components/AsyncSections/AsyncArticlesRelated';
// // 非关键组件 - 客户端懒加载
// const AsyncArticleActions = dynamic(() => import('@/app/article/components/AsyncSections/AsyncArticleActions'), {
//   ssr: false, // 关闭 SSR，客户端渲染
//   loading: () => <LoadingSkeleton type="article-actions" />,
// });

// const AsyncArticlesRelated = dynamic(() => import('@/app/article/components/AsyncSections/AsyncArticlesRelated'), {
//   ssr: false, // 关闭 SSR，客户端渲染
//   loading: () => <LoadingSkeleton type="articles-related" />,
// });

export default function ArticleDetailPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* 导航头部 - 固定高度 */}
      <div className="h-16">
        <HybridStandardContainer componentName="Nav-Header" fallback={<LoadingSkeleton type="article-header" />}>
          <NavHeaderServer title="资讯详情" />
          <NavHeaderHydration />
        </HybridStandardContainer>
      </div>

      {/* 文章标题区域 - 预留最小高度 */}
      <div className="min-h-[120px]">
        <HybridStandardContainer componentName="Article-Header" fallback={<LoadingSkeleton type="article-header" />}>
          <ArticleHeaderServer />
          <ArticleHeaderHydration />
        </HybridStandardContainer>
      </div>

      {/* 文章正文 - 预留内容区域 */}
      <div className="min-h-[800px]">
        <HybridStandardContainer componentName="Article-Content-Priority" fallback={<LoadingSkeleton type="article-content" />}>
          <ArticleContent articleId="" />
        </HybridStandardContainer>
      </div>

      {/* 交互操作栏 - 客户端懒加载 */}
      <div className="h-20">
        <AsyncArticleActions />
      </div>

      {/* 相关推荐 - 客户端懒加载 */}
      <div className="min-h-[300px]">
        <AsyncArticlesRelated />
      </div>
    </main>
  );
}
