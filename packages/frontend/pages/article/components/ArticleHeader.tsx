'use client';

import { useEffect } from 'react';

interface ArticleHeaderProps {
  article: {
    title: string;
    author: {
      name: string;
      avatar: string;
      verified: boolean;
    };
    publishTime: string;
    readCount: number;
  };
}

export default function ArticleHeader({ article }: ArticleHeaderProps) {
  // 水合后绑定交互事件
  useEffect(() => {
    const handleShare = () => {
      if (navigator.share) {
        navigator.share({
          title: article.title,
          url: window.location.href
        }).catch(console.error);
      } else {
        // 降级处理
        navigator.clipboard.writeText(window.location.href)
          .then(() => alert('链接已复制到剪贴板'))
          .catch(() => alert('分享功能暂不可用'));
      }
    };
    
    const handleBack = () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = '/';
      }
    };
    
    // 绑定事件到按钮
    const shareBtn = document.getElementById('share-btn');
    const backBtn = document.getElementById('back-btn');
    
    if (shareBtn) shareBtn.addEventListener('click', handleShare);
    if (backBtn) backBtn.addEventListener('click', handleBack);
    
    return () => {
      if (shareBtn) shareBtn.removeEventListener('click', handleShare);
      if (backBtn) backBtn.removeEventListener('click', handleBack);
    };
  }, [article.title]);
  
  return (
    <>
      {/* 导航栏 */}
      <nav className="sticky top-0 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            id="back-btn"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h1 className="text-lg font-medium text-gray-900 truncate mx-4">文章详情</h1>
          
          <button 
            id="share-btn"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
        </div>
      </nav>
      
      {/* 文章头部信息 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src={article.author.avatar} 
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center space-x-1">
                  <span className="font-medium text-gray-900">{article.author.name}</span>
                  {article.author.verified && (
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{article.publishTime}</span>
                  <span>•</span>
                  <span>{article.readCount.toLocaleString()}阅读</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}