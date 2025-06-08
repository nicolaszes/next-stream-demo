interface LoadingSkeletonProps {
  type: 'banner' | 'category' | 'recommendation' | 'article-header' | 'article-content' | 'related-articles'
}

export default function LoadingSkeleton({ type }: LoadingSkeletonProps) {
  if (type === 'article-header') {
    return (
      <div className="px-4 py-6">
        {/* 标题骨架 */}
        <div className="space-y-2 mb-4">
          <div className="h-6 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
        </div>
        
        {/* 作者信息骨架 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-32" />
            </div>
          </div>
          <div className="h-8 bg-gray-200 rounded-full animate-pulse w-16" />
        </div>
      </div>
    )
  }

  if (type === 'article-content') {
    return (
      <div className="px-4 pb-6">
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
            </div>
          ))}
          {/* 图片骨架 */}
          <div className="h-48 bg-gray-200 rounded-lg animate-pulse my-6" />
        </div>
      </div>
    )
  }

  if (type === 'related-articles') {
    return (
      <div className="px-4 py-6">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-24 mb-4" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
              </div>
              <div className="w-30 h-20 bg-gray-200 rounded-lg animate-pulse flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // 保留原有的骨架屏类型
  if (type === 'banner') {
    return (
      <div className="flex space-x-4 overflow-hidden">
        {[1, 2].map((i) => (
          <div key={i} className="flex-shrink-0">
            <div className="w-80 h-36 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        ))}
      </div>
    )
  }

  if (type === 'category') {
    return (
      <div className="bg-white rounded-lg p-4">
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
              <div className="w-8 h-3 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'recommendation') {
    return (
      <div className="bg-white rounded-lg p-4">
        <div className="w-24 h-6 bg-gray-200 rounded animate-pulse mb-4" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-full h-3 bg-gray-200 rounded animate-pulse" />
                <div className="w-1/4 h-5 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}