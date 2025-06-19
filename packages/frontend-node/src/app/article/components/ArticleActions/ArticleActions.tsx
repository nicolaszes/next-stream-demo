'use client';

import { useState, useEffect } from 'react';

export default function ClientArticleActions() {
  const [mounted, setMounted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [collected, setCollected] = useState(false);
  const [likeCount, setLikeCount] = useState(1248);

  useEffect(() => {
    setMounted(true);
    // 在客户端挂载后初始化插件
    console.log('🔥 ArticleActions 客户端插件已挂载');
  }, []);

  if (!mounted) {
    // 服务端渲染时显示静态版本
    return (
      <div className="border-t border-gray-100 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm">1248</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 客户端渲染的交互版本
  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleCollect = () => {
    setCollected(!collected);
  };

  return (
    <div className="border-t border-gray-100 px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 ${liked ? 'text-red-500' : 'text-gray-600'}`}
          >
            <svg className="w-5 h-5" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-sm">{likeCount}</span>
          </button>
          
          <button
            onClick={handleCollect}
            className={`flex items-center space-x-1 ${collected ? 'text-yellow-500' : 'text-gray-600'}`}
          >
            <svg className="w-5 h-5" fill={collected ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span className="text-sm">收藏</span>
          </button>
        </div>
      </div>
    </div>
  );
}