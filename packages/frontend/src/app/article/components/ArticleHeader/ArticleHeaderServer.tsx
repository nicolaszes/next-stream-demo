import { articleApi } from '@/lib/api';
import Image from 'next/image';

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

async function getArticleInfo(): Promise<ArticleInfo> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  try {
    const response = await articleApi.getArticleInfo();
    return response.data as ArticleInfo;
  } catch (error){
    // 如果获取失败，返回静态数据作为降级
    throw error;
  }
}

// 完全静态的文章头部，在构建时预渲染
export default async function StaticArticleHeader() {
  // 尝试获取动态数据，失败时使用静态数据
  const articleInfo = await getArticleInfo();

  return (
    <div className="px-4 py-6">
      {/* 文章标题 */}
      <h1 className="text-xl font-bold text-gray-900 leading-7 mb-4">
        {articleInfo.title}
      </h1>
      
      {/* 作者信息 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            {articleInfo.author.avatar ? (
              <Image
                src={articleInfo.author.avatar}
                alt={articleInfo.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">
                  {articleInfo.author.name.charAt(0)}
                </span>
              </div>
            )}
            {articleInfo.author.verified && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900">{articleInfo.author.name}</span>
              {articleInfo.author.verified && (
                <span className="text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">认证</span>
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
              <span>{articleInfo.publishTime}</span>
              <span>•</span>
              <span>{articleInfo.readCount.toLocaleString()}阅读</span>
            </div>
          </div>
        </div>
        {/* 关注按钮 - 添加水合标识 */}
        <button 
          className="px-4 py-1.5 text-sm text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors"
          data-follow-button="true"
          data-author-name={articleInfo.author.name}
        >
          关注
        </button>
      </div>
      
      {/* 隐藏的数据容器，供客户端水合使用 */}
      <script 
        type="application/json" 
        data-article-info="true"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleInfo)
        }}
      />
    </div>
  );
}