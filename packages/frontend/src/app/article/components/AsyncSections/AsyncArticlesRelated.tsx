'use client';

import dynamic from 'next/dynamic';
import HybridStandardContainer from '@/components/HybridStandardContainer';

import LoadingSkeleton from '@/components/LoadingSkeleton';

const ArticlesRelated = dynamic(() => import('@/app/article/components/ArticleRelated/ArticlesRelated'), {
  ssr: false, // 关闭 SSR，客户端渲染
  loading: () => <LoadingSkeleton type="article-actions" />,
});

export default function AsyncArticlesRelated() {
  return (
    <HybridStandardContainer componentName="Article-Content-Priority" fallback={<LoadingSkeleton type="articles-related" />}>
      <ArticlesRelated />
    </HybridStandardContainer>
  );
}