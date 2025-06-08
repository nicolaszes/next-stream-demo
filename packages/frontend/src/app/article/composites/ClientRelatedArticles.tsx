'use client';

import { useState, useEffect } from 'react';
import StandardContainer from '@next-stream-demo/standard-container';
import { DefaultErrorCapturePlugin, DefaultLazyLoadPlugin } from '@next-stream-demo/standard-container';
import LoadingSkeleton from '../../../components/LoadingSkeleton';

export default function ClientRelatedArticles() {
  const [mounted, setMounted] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);

    // 客户端数据获取
    const fetchArticles = async () => {
      try {
        // 模拟 API 调用
        await new Promise((resolve) => setTimeout(resolve, 500));
        const mockArticles = [
          {
            id: 1,
            title: "相关文章标题 1",
            summary: "这是文章摘要...",
            author: "作者1",
            readCount: 1200,
            publishTime: "2小时前",
            image: null
          },
          // ... 更多文章
        ];
        // @ts-expect-error
        setArticles(mockArticles);
      } catch (error) {
        console.error('获取相关文章失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (!mounted || loading) {
    return <LoadingSkeleton type="related-articles" />;
  }

  // 客户端插件配置
  const plugins = [new DefaultErrorCapturePlugin(true), new DefaultLazyLoadPlugin(true)];

  return (
    <StandardContainer
      plugins={plugins}
      componentName="ClientRelatedArticles"
      fallback={<LoadingSkeleton type="related-articles" />}
    >
      {(utils) => (
        <div className="px-4 py-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">相关推荐</h2>
          <div className="space-y-4">
            {articles.map((article) => (
              <div
                key={(article as { id: number }).id}
                className="flex space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 line-clamp-2 mb-2">
                    {(article as { title: string }).title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{(article as { summary: string }).summary}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-2">
                      <span>{(article as { author: string }).author}</span>
                      <span>•</span>
                      <span>{(article as { readCount: number }).readCount.toLocaleString()}阅读</span>
                    </div>
                    <span>{(article as { publishTime: string }).publishTime}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {(article as { image: string | null }).image ? (
                    utils.createLazyImage(
                      (article as { image: string | null }).image,
                      (article as { title: string }).title,
                      {
                        className: 'w-30 h-20 rounded-lg object-cover',
                      }
                    )
                  ) : (
                    <div className="w-30 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </StandardContainer>
  );
}
