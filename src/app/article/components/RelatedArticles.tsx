import { articleApi } from '@/lib/api'
import Image from 'next/image'

interface RelatedArticle {
  id: string
  title: string
  summary: string
  image: string
  author: string
  readCount: number
  publishTime: string
}

async function getRelatedArticles(): Promise<RelatedArticle[]> {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  try {
    const response = await articleApi.getRelatedArticles()
    return response.data as RelatedArticle[]
  } catch {
    throw new Error('Failed to fetch article info')
  }
}

export default async function RelatedArticles() {
  const articles = await getRelatedArticles()

  console.log('relatedArticles', articles);
  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">相关推荐</h2>
      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.id} className="flex space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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
            <div className="flex-shrink-0">
              {article.image ? (
                <Image
                  src={article.image}
                  alt={article.title}
                  width={120}
                  height={80}
                  className="rounded-lg object-cover"
                  // onError={() => console.log('Article image failed to load')}
                />
              ) : (
                <div className="w-30 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}