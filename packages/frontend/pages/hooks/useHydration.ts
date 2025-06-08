import { useEffect, useState, useRef } from 'react';

type HydrationState = 'pending' | 'hydrating' | 'complete';

interface InitialData {
  article: {
    id: string;
    title: string;
    author: string;
    publishTime: string;
    readCount: number;
  };
  user: {
    isLoggedIn: boolean;
    username?: string;
  };
  timestamp: number;
}

export function useHydration() {
  const [hydrationState, setHydrationState] = useState<HydrationState>('pending');
  const [initialData, setInitialData] = useState<InitialData | null>(null);
  const hydrationRef = useRef<boolean>(false);

  useEffect(() => {
    // 检查是否是从后端渲染的页面
    if (!(window as any).__START_HYDRATION__ || hydrationRef.current) return;
    hydrationRef.current = true;

    console.log('🔥 开始 Next.js 水合');
    setHydrationState('hydrating');

    // 获取后端注入的初始数据
    const initialDataElement = document.getElementById('initial-data');
    if (initialDataElement) {
      try {
        const data = JSON.parse(initialDataElement.textContent || '{}');
        setInitialData(data);
        console.log('📦 获取到后端初始数据:', data);
      } catch (error) {
        console.error('❌ 解析初始数据失败:', error);
      }
    }

    // 完成水合
    const completeHydration = () => {
      setHydrationState('complete');
      
      // 更新 DOM 状态
      document.querySelectorAll('.hydration-pending').forEach(el => {
        el.classList.remove('hydration-pending');
        el.classList.add('hydration-complete');
      });
      
      console.log('✅ Next.js 水合完成，开始接管页面');
    };

    setTimeout(completeHydration, 200);

    // 注册全局水合函数
    (window as any).__START_HYDRATION__ = () => {
      console.log('🚀 后端触发 Next.js 水合');
    };

  }, []);

  return {
    hydrationState,
    initialData,
    isHydrated: hydrationState === 'complete',
    isFromBackend: !!(window as any).__START_HYDRATION__
  };
}