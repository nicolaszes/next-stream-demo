import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ArticleHeader from './components/ArticleHeader'
import ArticleContent from './components/ArticleContent'
import RelatedArticles from './components/RelatedArticles'

interface ArticleProps {
  article: {
    id: string
    title: string
    content: string
    author: {
      name: string
      avatar: string
      verified: boolean
    }
    publishTime: string
    readCount: number
    summary: string
  }
  initialContent?: {
    content: string
    images: string[]
  } | null
}

export default function ArticlePage({ article, initialContent }: ArticleProps) {
  const router = useRouter()
  
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>{article.title} - Frontend PR</title>
        <meta name="description" content={article.summary} />
        <meta name="author" content={article.author.name} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:type" content="article" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <ArticleHeader article={article} />
        
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          <ArticleContent
            articleId={article.id}
            initialContent={initialContent}
          />
          
          <RelatedArticles />
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // 模拟数据获取
  const article = {
    id: params?.id as string,
    title: '今日的日本，可能就是20年后的中国！',
    content: '这是一个基于 Next.js Page Router 架构的示例文章。',
    author: {
      name: '半城学渣',
      avatar: 'https://logo.com/image-cdn/images/kts928pd/production/5f4f0c90d60931ba876fad50c4533c3ec5602a91-7575x2115.webp?w=1920&q=70&fm=webp',
      verified: true
    },
    publishTime: '2024-01-15 14:30',
    readCount: 12500,
    summary: '探讨日本社会现状对中国未来发展的启示...'
  }
  
  // 模拟获取文章内容
  const initialContent = {
    content: `日本作为一个发达国家，其社会发展模式和面临的挑战，为我们观察未来中国可能的发展轨迹提供了重要参考。

从人口结构来看，日本正面临着严重的老龄化问题。根据最新统计，日本65岁以上人口占比已超过28%，这一比例还在持续上升。与此同时，出生率持续下降，2023年新生儿数量创历史新低。`,
    images: [
      'https://logo.com/image-cdn/images/kts928pd/production/5f4f0c90d60931ba876fad50c4533c3ec5602a91-7575x2115.webp?w=1920&q=70&fm=webp'
    ]
  }
  
  return {
    props: {
      article,
      initialContent
    }
  }
}