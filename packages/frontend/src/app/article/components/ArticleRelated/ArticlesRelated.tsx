'use client';

import { useEffect, useState } from 'react';
import StandardContainer from '@next-stream-demo/standard-container';
import { DefaultErrorCapturePlugin, DefaultLazyLoadPlugin } from '@next-stream-demo/standard-container';

interface RelatedArticle {
  id: string;
  title: string;
  summary: string;
  author: string;
  readCount: number;
  publishTime: string;
}

export default function RelatedArticles() {
  const [articles, setArticles] = useState<RelatedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    let isMounted = true;
    
    const loadRelatedArticles = async () => {
      try {
        console.log('📚 开始加载相关文章');
        
        // 延迟加载，优化用户体验
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        const response = await fetch('/api/article/related');
        const result = await response.json();
        
        if (isMounted && result.success) {
          setArticles(result.data);
        }
      } catch (error) {
        console.error('❌ 加载相关文章失败:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    loadRelatedArticles();
    
    return () => {
      isMounted = false;
    };
  }, []);
  
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">相关推荐</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <StandardContainer
      plugins={[new DefaultErrorCapturePlugin(true), new DefaultLazyLoadPlugin(true)]}
      componentName="RelatedArticles"
      fallback={<div className="text-center py-4">加载中...</div>}
    >
      {() => (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">相关推荐</h2>
          <div className="space-y-4">
            {articles.map((article) => (
              <div 
                key={article.id} 
                className="flex space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => {
                  // 这里可以添加路由跳转逻辑
                  console.log('点击文章:', article.title);
                }}
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 line-clamp-2 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {article.summary}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-2">
                      <span>{article.author}</span>
                      <span>•</span>
                      <span>{article.readCount.toLocaleString()}阅读</span>
                    </div>
                    <span>{article.publishTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </StandardContainer>
  );
}