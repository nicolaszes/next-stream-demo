'use client';

import { useEffect } from 'react';

export default function NavHeaderHydration() {
  useEffect(() => {
    const handleBackClick = () => {
      window.history.back();
    };

    const handleShareClick = () => {
      console.log('分享文章');
      // 这里可以添加分享逻辑
    };

    // 为服务端渲染的元素添加事件监听器
    const backButton = document.querySelector('[data-nav-back="true"]');
    const shareButton = document.querySelector('[data-nav-share="true"]');

    if (backButton) {
      backButton.addEventListener('click', handleBackClick);
    }

    if (shareButton) {
      shareButton.addEventListener('click', handleShareClick);
    }

    // 清理函数
    return () => {
      if (backButton) {
        backButton.removeEventListener('click', handleBackClick);
      }
      if (shareButton) {
        shareButton.removeEventListener('click', handleShareClick);
      }
    };
  }, []);

  // 这个组件不渲染任何内容，只负责添加交互
  return null;
}