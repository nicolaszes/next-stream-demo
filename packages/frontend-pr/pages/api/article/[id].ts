import type { NextApiRequest, NextApiResponse } from 'next'

type ArticleData = {
  id: string
  title: string
  content: string
  author: string
  publishTime: string
}

type ErrorData = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ArticleData | ErrorData>
) {
  const { id } = req.query
  
  if (req.method === 'GET') {
    // 模拟文章数据
    const article: ArticleData = {
      id: id as string,
      title: `文章 ${id}`,
      content: '这是文章内容...',
      author: '作者名称',
      publishTime: new Date().toISOString()
    }
    
    res.status(200).json(article)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: 'Method not allowed' })
  }
}