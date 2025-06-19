import React from 'react';

interface ArticleNavHeaderProps {
  title?: string;
}

export default function ServerNavHeader({ 
  title = "资讯详情"
}: ArticleNavHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <div 
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 cursor-pointer"
            data-nav-back="true"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <span className="text-sm text-gray-600">{title}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div 
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
            data-nav-share="true"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}