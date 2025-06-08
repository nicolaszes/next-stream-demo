import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import LoadingSkeleton from '../../../components/LoadingSkeleton';
import ArticleContent from './ArticleContent';

// 动态导入，禁用 SSR
const ClientArticleActions = dynamic(
  () => import('./ClientArticleActions'),
  { ssr: true, loading: () => <LoadingSkeleton type="article-content" /> }
);

const ClientRelatedArticles = dynamic(
  () => import('./ClientRelatedArticles'),
  { ssr: true, loading: () => <LoadingSkeleton type="related-articles" /> }
);

export default function StreamingContent() {
  return (
    <div className="bg-white">
      {/* 文章正文 - 流式 SSR */}
      <Suspense fallback={<LoadingSkeleton type="article-content" />}>
        <ArticleContent />
      </Suspense>

      {/* 交互操作栏 - 客户端渲染 */}
      <ClientArticleActions />

      {/* 相关推荐 - 客户端渲染 + 插件系统 */}
      <section className="mt-2 bg-white">
        <ClientRelatedArticles />
      </section>
    </div>
  );
}