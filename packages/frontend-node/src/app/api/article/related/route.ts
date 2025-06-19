import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const mockRelatedArticles = [
      {
        id: '2',
        title: '韩国的低生育率危机：东亚模式的警示',
        summary: '韩国生育率跌至0.78，创全球最低记录，其应对措施值得借鉴。',
        publishTime: '2024-01-10',
        readCount: 8500
      },
      {
        id: '3', 
        title: '新加坡的人口政策：小国的大智慧',
        summary: '新加坡通过移民政策和生育激励，成功应对人口挑战。',
        publishTime: '2024-01-08',
        readCount: 6200
      },
      {
        id: '4',
        title: '德国工业4.0：制造业转型的启示',
        summary: '德国如何通过技术创新应对劳动力短缺，值得中国学习。',
        publishTime: '2024-01-05',
        readCount: 7800
      }
    ];
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return NextResponse.json({
      success: true,
      data: mockRelatedArticles
    });
  } catch (error) {
    console.error('获取相关文章失败:', error);
    return NextResponse.json(
      {
        success: false,
        message: '服务器错误'
      },
      { status: 500 }
    );
  }
}