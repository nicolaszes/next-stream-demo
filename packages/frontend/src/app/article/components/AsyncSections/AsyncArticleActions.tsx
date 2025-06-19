'use client';

import dynamic from 'next/dynamic';
import HybridStandardContainer from '@/components/HybridStandardContainer';

import LoadingSkeleton from '@/components/LoadingSkeleton';

// 懒加载 ArticleActions 组件
const ArticleActions = dynamic(() => import('@/app/article/components/ArticleActions/ArticleActions'), {
  ssr: false, // 关闭 SSR，客户端渲染
  loading: () => <LoadingSkeleton type="article-actions" />,
});

export default function AsyncArticleActions() {
  return (
    <HybridStandardContainer componentName="Article-Content-Priority" fallback={<LoadingSkeleton type="article-actions" />}>
      <ArticleActions />
    </HybridStandardContainer>
  );
}