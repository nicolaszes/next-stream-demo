import type { GetServerSidePropsContext } from 'next';
import type { Article as ArticleData } from '@next-stream-demo/shared';

export interface ArticlePageData {
  article: ArticleData;
  content?: {
    content: string;
    images: string[];
  } | null;
  meta: {
    timestamp: string;
    version: string;
  };
}

// 获取文章基本信息
const fetchArticleInfo = (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          id: 'default',
          title: '今日的日本，可能就是20年后的中国！',
          author: {
            name: '半城学渣',
            avatar:
              'https://logo.com/image-cdn/images/kts928pd/production/5f4f0c90d60931ba876fad50c4533c3ec5602a91-7575x2115.webp?w=1920&q=70&fm=webp',
            verified: true,
          },
          publishTime: '2024-01-15 14:30',
          readCount: 12500,
          summary: '探讨日本社会现状对中国未来发展的启示...',
        },
      });
    }, 50);
  });
};

// 获取文章内容
const fetchArticleContent = (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          content: `日本作为一个发达国家，其社会发展模式和面临的挑战，为我们观察未来中国可能的发展轨迹提供了重要参考。

从人口结构来看，日本正面临着严重的老龄化问题。根据最新统计，日本65岁以上人口占比已超过28%，这一比例还在持续上升。与此同时，出生率持续下降，2023年新生儿数量创历史新低。

这种人口结构的变化，带来了一系列社会经济问题：

1. **劳动力短缺**：各行各业都面临招工难的问题，特别是服务业和制造业。

2. **社会保障压力**：养老金和医疗保险系统承受巨大压力，政府财政负担加重。

3. **消费市场萎缩**：人口减少直接影响内需，经济增长效力。

4. **创新活力下降**：年轻人口减少，社会整体创新能力受到影响。

反观中国，虽然目前仍处于发展阶段，但人口老龄化的趋势已经显现。预计到2040年，中国65岁以上人口占比将达到20%以上，接近当前日本的水平。

因此，我们需要从日本的经验中汲取教训，提前做好应对准备：

**政策层面**：完善生育支持政策，优化人口结构；加强职业教育，提高劳动生产率；推进养老保险制度，确保可持续发展。

**社会层面**：转变传统观念，营造生育友好环境；发展银发经济，挖掘老龄人口潜力；推广智能化技术，缓解劳动力短缺。

**个人层面**：提升自身技能，适应社会变化；合理规划养老，减轻社会负担；保持开放心态，拥抱新技术新模式。

总的来说，日本今天面临的挑战，很可能就是中国明天需要应对的问题。我们应该以史为鉴，提前布局，争取走出一条具有中国特色的发展道路。`,
          images: [
            'https://logo.com/image-cdn/images/kts928pd/production/5f4f0c90d60931ba876fad50c4533c3ec5602a91-7575x2115.webp?w=1920&q=70&fm=webp',
            'https://logo.com/image-cdn/images/kts928pd/production/5f4f0c90d60931ba876fad50c4533c3ec5602a91-7575x2115.webp?w=1920&q=70&fm=webp',
          ],
        },
      });
    }, 200);
  });
};

// 获取文章页面数据的主函数
export const getArticlePageData = async (
  context: GetServerSidePropsContext
): Promise<{ props: { initialData: ArticlePageData } }> => {
  const { id = 'default' } = context.query;

  try {
    // 并发获取文章基本信息和内容数据
    const [articleResult, contentResult] = await Promise.allSettled([
      fetchArticleInfo(),
      fetchArticleContent(),
    ]);

    // 处理 Promise.allSettled 的结果
    const mockArticleData = articleResult.status === 'fulfilled' ? (articleResult.value as any) : null;
    const contentData = contentResult.status === 'fulfilled' ? (contentResult.value as any) : null;

    const initialData: ArticlePageData = {
      article: {
        id: mockArticleData?.data?.id || 'default',
        title: mockArticleData?.data?.title || '今日的日本，可能就是20年后的中国！',
        // @ts-expect-error
        author: {
          name: mockArticleData?.data?.author?.name || '半城学渣',
          avatar: mockArticleData?.data?.author?.avatar || '/avatars/default.jpg',
          verified: mockArticleData?.data?.author?.verified || true,
        },
        publishTime: mockArticleData?.data?.publishTime || '2024-01-15 14:30',
        readCount: mockArticleData?.data?.readCount || 12500,
        summary: mockArticleData?.data?.summary || '探讨日本社会现状对中国未来发展的启示...',
      },
      content: contentData?.success ? contentData.data : null,
      meta: {
        timestamp: new Date().toISOString(),
        version: '2.0.0',
      },
    };

    return {
      props: {
        initialData,
      },
    };
  } catch (error) {
    console.error('获取文章数据失败:', error);

    // 返回默认数据而不是 404
    return {
      props: {
        initialData: {
          article: {
            id: 'default',
            title: '今日的日本，可能就是20年后的中国！',
            // @ts-expect-error
            author: {
              name: '半城学渣',
              avatar: '/avatars/default.jpg',
              verified: true,
            },
            publishTime: '2024-01-15 14:30',
            readCount: 12500,
            summary: '探讨日本社会现状对中国未来发展的启示...',
          },
          content: null,
          meta: {
            timestamp: new Date().toISOString(),
            version: '2.0.0',
          },
        },
      },
    };
  }
};