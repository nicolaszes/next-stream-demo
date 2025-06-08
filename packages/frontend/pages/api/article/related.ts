import type { NextApiRequest, NextApiResponse } from 'next';

interface RelatedArticlesResponse {
  success: boolean;
  data?: Array<{
    id: string;
    title: string;
    summary: string;
    author: string;
    readCount: number;
    publishTime: string;
  }>;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RelatedArticlesResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
  
  try {
    const mockArticles = [
      {
        id: '1',
        title: '韩国的低生育率危机：东亚模式的警示',
        summary: '韩国生育率跌至0.78，创全球最低记录，其应对措施值得借鉴...',
        author: '东亚观察',
        readCount: 8900,
        publishTime: '2小时前'
      },
      {
        id: '2', 
        title: '新加坡如何应对人口老龄化挑战',
        summary: '通过移民政策和科技创新，新加坡在人口结构优化方面取得显著成效...',
        author: '城市发展研究',
        readCount: 6700,
        publishTime: '5小时前'
      },
      {
        id: '3',
        title: '德国工业4.0：制造业转型的成功范例',
        summary: '德国通过数字化转型，成功应对了劳动力短缺和产业升级的双重挑战...',
        author: '制造业前沿',
        readCount: 12300,
        publishTime: '1天前'
      },
      {
        id: '4',
        title: '北欧养老模式：可持续发展的社会保障体系',
        summary: '瑞典、丹麦等北欧国家的养老制度设计，为应对老龄化提供了新思路...',
        author: '社会政策研究',
        readCount: 5400,
        publishTime: '2天前'
      }
    ];
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 800));
    
    res.status(200).json({
      success: true,
      data: mockArticles
    });
  } catch (error) {
    console.error('获取相关文章失败:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误'
    });
  }
}