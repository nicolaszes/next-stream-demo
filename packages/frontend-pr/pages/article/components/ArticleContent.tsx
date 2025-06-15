import { useEffect, useState } from 'react';

interface ArticleContentProps {
  articleId: string;
  initialContent?: {
    content: string;
    images: string[];
  } | null;
}

interface ArticleContentData {
  content: string;
  images: string[];
}

export default function ArticleContent({ articleId, initialContent }: ArticleContentProps) {
  const [content, setContent] = useState<ArticleContentData | null>(initialContent || null);
  const [loading, setLoading] = useState(!initialContent);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // 如果已经有初始内容，就不需要再次请求
    if (initialContent) {
      return;
    }

    let isMounted = true;
    
    const loadContent = async () => {
      try {
        console.log('📖 开始加载文章内容');
        
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 800));
        
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
  }, [articleId, initialContent]);
  
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
        <div className="text-center py-8 text-gray-500">
          暂无内容
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="prose prose-gray max-w-none">
        <div className="whitespace-pre-line text-gray-800 leading-relaxed mb-6">
          {content.content}
        </div>
        
        {content.images && content.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {content.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`文章图片 ${index + 1}`}
                className="w-full h-auto rounded-lg object-cover"
                loading="lazy"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}