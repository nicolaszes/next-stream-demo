'use client';

import { useEffect, useState } from 'react';
import StandardContainer from '@next-stream-demo/standard-container';
import { DefaultErrorCapturePlugin, DefaultLazyLoadPlugin } from '@next-stream-demo/standard-container';

interface ArticleContentProps {
  articleId: string;
}

interface ArticleContentData {
  content: string;
  images: string[];
}

export default function ArticleContent({ articleId }: ArticleContentProps) {
  const [content, setContent] = useState<ArticleContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    let isMounted = true;
    
    const loadContent = async () => {
      try {
        console.log('📖 开始加载文章内容');
        
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 400));
        
        const response = await fetch('/api/article/content');
        
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        
        const result = await response.json();
        
        if (isMounted) {
          if (result.success) {
            setContent(result.data);
          } else {
            throw new Error(result.message || '加载失败');
          }
        }
      } catch (err) {
        console.error('❌ 加载文章内容失败:', err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : '加载失败');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    loadContent();
    
    return () => {
      isMounted = false;
    };
  }, [articleId]);
  
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center py-8">
          <div className="text-red-500 mb-2">⚠️ 内容加载失败</div>
          <div className="text-gray-500 text-sm">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }
  
  if (!content) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center py-8 text-gray-500">暂无内容</div>
      </div>
    );
  }
  
  return (
    <StandardContainer
      plugins={[new DefaultErrorCapturePlugin(true), new DefaultLazyLoadPlugin(true)]}
      componentName="ArticleContent"
      fallback={<div className="text-center py-4">加载中...</div>}
    >
      {(utils) => (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="prose prose-gray max-w-none">
            <div className="text-gray-800 leading-relaxed whitespace-pre-line text-base">
              {content.content}
            </div>
            
            {content.images && content.images.length > 0 && (
              <div className="mt-6 space-y-4">
                {content.images.map((img, index) => (
                  <div key={index} className="my-6">
                    {utils.createLazyImage(img, `文章图片 ${index + 1}`, {
                      className: 'w-full rounded-lg shadow-sm object-cover',
                      style: { maxHeight: '400px' }
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </StandardContainer>
  );
}