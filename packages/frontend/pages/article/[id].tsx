import { GetServerSideProps } from 'next';
import { Suspense } from 'react';
import Head from 'next/head';
import type { Article as ArticleData } from '@next-stream-demo/shared';
import ArticleHeader from './components/ArticleHeader';
import ArticleContent from './components/ArticleContent';
import RelatedArticles from './components/RelatedArticles';

import LoadingSkeleton from '../../src/components/LoadingSkeleton';
import { getArticlePageData, type ArticlePageData } from './services/articleService';

import './globals.css';

interface ArticlePageProps {
  initialData: ArticlePageData;
}

export default function ArticlePage({ initialData }: ArticlePageProps) {
  return (
    <>
      <Head>
        <title>{initialData.article.title} - 文章详情</title>
        <meta
          name="description"
          // @ts-ignore
          content={initialData.article.summary}
        />
        <meta
          name="author"
          // @ts-ignore
          content={initialData.article.author.name}
        />
        <meta property="og:title" content={initialData.article.title} />
        <meta
          property="og:description"
          // @ts-ignore
          content={initialData.article.summary}
        />
        <meta property="og:type" content="article" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* 首屏内容 - 立即渲染 */}

        <ArticleHeader
          // @ts-ignore
          article={initialData.article}
        />

        {/* 主要内容区域 */}
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {/* 文章内容 - 流式渲染 */}
          <Suspense fallback={<LoadingSkeleton type="article-content" />}>
            <ArticleContent
              articleId={initialData.article.id}
              // @ts-ignore
              initialContent={initialData.content}
            />
          </Suspense>

          {/* 相关文章 - 延迟加载 */}
          <Suspense fallback={<LoadingSkeleton type="related-articles" />}>
            <RelatedArticles
              // @ts-ignore
              articleId={initialData.article.id}
            />
          </Suspense>
        </div>

        {/* 底部操作栏 */}
        <div id="bottom-actions"></div>
      </div>
    </>
  );
}

// 服务端渲染 - 获取首屏数据
export const getServerSideProps: GetServerSideProps = getArticlePageData;
