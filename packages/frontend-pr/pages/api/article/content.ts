import type { NextApiRequest, NextApiResponse } from 'next';

interface ArticleContentResponse {
  success: boolean;
  data?: {
    content: string;
    images: string[];
  };
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ArticleContentResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
  
  try {
    // 模拟从后端 API 获取数据
    const mockContent = {
      content: `日本作为一个发达国家，其社会发展模式和面临的挑战，为我们观察未来中国可能的发展轨迹提供了重要参考。

从人口结构来看，日本正面临着严重的老龄化问题。根据最新统计，日本65岁以上人口占比已超过28%，这一比例还在持续上升。与此同时，出生率持续下降，2023年新生儿数量创历史新低。

这种人口结构的变化，带来了一系列社会经济问题：

1. **劳动力短缺**：各行各业都面临招工难的问题，特别是服务业和制造业。

2. **社会保障压力**：养老金和医疗保险系统承受巨大压力，政府财政负担加重。

3. **消费市场萎缩**：人口减少直接影响内需，经济增长乏力。

4. **创新活力下降**：年轻人口减少，社会整体创新能力受到影响。

反观中国，虽然目前仍处于发展阶段，但人口老龄化的趋势已经显现。预计到2040年，中国65岁以上人口占比将达到20%以上，接近当前日本的水平。

因此，我们需要从日本的经验中汲取教训，提前做好应对准备：

**政策层面**：完善生育支持政策，优化人口结构；加强职业教育，提高劳动生产率；推进养老保险制度改革，确保可持续发展。

**社会层面**：转变传统观念，营造生育友好环境；发展银发经济，挖掘老龄人口潜力；推广智能化技术，缓解劳动力短缺。

**个人层面**：提升自身技能，适应社会变化；合理规划养老，减轻社会负担；保持开放心态，拥抱新技术新模式。

总的来说，日本今天面临的挑战，很可能就是中国明天需要应对的问题。我们应该以史为鉴，提前布局，争取走出一条具有中国特色的发展道路。`,
      images: [
        'https://p3-sign.toutiaoimg.com/tos-cn-i-6w9my0ksvp/example1.jpg',
        'https://p3-sign.toutiaoimg.com/tos-cn-i-6w9my0ksvp/example2.jpg'
      ]
    };
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    res.status(200).json({
      success: true,
      data: mockContent
    });
  } catch (error) {
    console.error('获取文章内容失败:', error);
    res.status(500).json({
      success: false,
      message: '服务器错误'
    });
  }
}