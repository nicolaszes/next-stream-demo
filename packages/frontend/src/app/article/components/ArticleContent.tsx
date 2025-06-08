import { articleApi } from '@/lib/api';

interface ArticleContent {
  content: string;
  images?: string[];
}

async function getArticleContent(): Promise<ArticleContent> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  try {
    const response = await articleApi.getArticleContent();
    return response.data as ArticleContent;
  } catch {
    throw new Error('Failed to fetch article info')
  }
}

export default async function ArticleContent() {
  const article = await getArticleContent();

  const paragraphs = article.content.split('\n\n').filter((p) => p.trim());

  return (
    <div className="px-4 pb-6">
      <div className="prose prose-gray max-w-none">
        {paragraphs.map((paragraph, index) => {
          // 在第2段后插入第一张图片
          if (index === 1 && article.images && article.images[0]) {
            return (
              <div key={index}>
                <p className="text-base leading-7 text-gray-800 mb-4">{paragraph}</p>
                <div className="my-6">
                  <img src={article.images[0]} alt="文章配图" className="w-full rounded-lg" />
                </div>
              </div>
            );
          }

          // 在第4段后插入第二张图片
          if (index === 3 && article.images && article.images[1]) {
            return (
              <div key={index}>
                <p className="text-base leading-7 text-gray-800 mb-4">{paragraph}</p>
                <div className="my-6">
                  <img src={article.images[1]} alt="文章配图" className="w-full rounded-lg" />
                </div>
              </div>
            );
          }

          return (
            <p key={index} className="text-base leading-7 text-gray-800 mb-4">
              {paragraph}
            </p>
          );
        })}
      </div>
    </div>
  );
}
