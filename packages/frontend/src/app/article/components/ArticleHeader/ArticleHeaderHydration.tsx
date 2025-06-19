'use client';

import { useEffect, useState, useCallback } from 'react';

interface ArticleInfo {
  title: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  publishTime: string;
  readCount: number;
  source: string;
}

export default function ArticleHeaderHydration() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [articleInfo, setArticleInfo] = useState<ArticleInfo | null>(null);

  // 数据获取 - 只在组件挂载时执行一次
  useEffect(() => {
    const dataScript = document.querySelector('[data-article-info="true"]');
    if (dataScript && dataScript.textContent) {
      try {
        const info = JSON.parse(dataScript.textContent) as ArticleInfo;
        setArticleInfo(info);
      } catch (error) {
        console.error('Failed to parse article info:', error);
      }
    }
  }, []); // 空依赖数组，只在挂载时执行

  // 关注操作处理函数
  const handleFollowClick = useCallback(async () => {
    const followButton = document.querySelector('[data-follow-button="true"]') as HTMLButtonElement;
    if (!followButton || !articleInfo) return;

    try {
      if (isFollowing) {
        // 取消关注逻辑
        console.log('取消关注:', articleInfo.author.name);
        setIsFollowing(false);
        followButton.textContent = '关注';
        followButton.className = 'px-4 py-1.5 text-sm text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors';
      } else {
        // 关注逻辑
        console.log('关注:', articleInfo.author.name);
        setIsFollowing(true);
        followButton.textContent = '已关注';
        followButton.className = 'px-4 py-1.5 text-sm text-white bg-blue-600 border border-blue-600 rounded-full hover:bg-blue-700 transition-colors';
      }
    } catch (error) {
      console.error('关注操作失败:', error);
    }
  }, [isFollowing, articleInfo]); // 只依赖必要的状态

  // 事件绑定 - 只在组件挂载时执行一次
  useEffect(() => {
    const followButton = document.querySelector('[data-follow-button="true"]') as HTMLButtonElement;
    
    if (followButton) {
      followButton.addEventListener('click', handleFollowClick);

      // 清理函数
      return () => {
        followButton.removeEventListener('click', handleFollowClick);
      };
    }
  }, []); // 空依赖数组，避免重复绑定

  // 更新按钮状态 - 当关注状态改变时执行
  useEffect(() => {
    const followButton = document.querySelector('[data-follow-button="true"]') as HTMLButtonElement;
    if (!followButton) return;

    // 移除旧的事件监听器
    followButton.removeEventListener('click', handleFollowClick);
    // 添加新的事件监听器
    followButton.addEventListener('click', handleFollowClick);

    return () => {
      followButton.removeEventListener('click', handleFollowClick);
    };
  }, [handleFollowClick]); // 只依赖 handleFollowClick

  return null;
}