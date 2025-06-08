import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import LoadingSkeleton from '../../../components/LoadingSkeleton';
import ArticleContent from '../components/ArticleContent';

// 动态导入，禁用 SSR
const ClientArticleActions = dynamic(() => import('./ClientArticleActions'), {
  ssr: true,
  loading: () => <LoadingSkeleton type="article-content" />,
});

const ClientRelatedArticles = dynamic(() => import('./ClientRelatedArticles'), {
  ssr: true,
  loading: () => <LoadingSkeleton type="related-articles" />,
});

export default function StreamingContent() {
  return (
    <div className="bg-white">
      {/* 文章正文 - 流式 SSR */}
      <Suspense fallback={<LoadingSkeleton type="article-content" />}>
        <ArticleContent articleId="" />
      </Suspense>

      {/* 交互操作栏 - 客户端渲染 */}
      <Suspense fallback={<LoadingSkeleton type="article-content" />}>
        <ClientArticleActions />
      </Suspense>

      {/* 相关推荐 - 客户端渲染 + 插件系统 */}
      <Suspense fallback={<LoadingSkeleton type="related-articles" />}>
        <ClientRelatedArticles />
      </Suspense>
    </div>
  );
}
