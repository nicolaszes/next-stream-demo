import { ApiResponse, Article, formatDate, delay } from '@next-stream-demo/shared';

// Mock数据定义 - 只保留文章相关数据
const mockData = {
  articleInfo: {
    title: "今日的日本，可能就是20年后的中国！",
    author: {
      name: "半桶吃半碗",
      avatar: "https://p26-sign.toutiaoimg.com/user-avatar/c2916fc164725e571bcbd5b98b1b9cd4~300x300.image?_iz=112761&from=tt_user.wtt&lk3s=06827d14&x-expires=1750032000&x-signature=OvE9Ra%2FWUGckInt23IF0lokM3Ho%3D",
      verified: true
    },
    publishTime: "2024-01-15 14:30",
    readCount: 12500,
    source: ""
  },
  
  articleContent: {
    content: `日本的现状确实有很多地方值得中国警惕，日本如今的单身社会现象很严重，40%家庭是"一人户"，中国独居人口也突破1.25亿，北上广深30岁以上未婚率超30%。

这一切看似令人担忧，但我们真的需要因此过度恐慌吗？我们常常从极端到极端地看待问题，一边担心人口下降带来的挑战，一边又对现状感到焦虑，但实际上人口的自然变化是一个正常的社会现象，不必过度焦虑。

如果人口逐渐减少，那又怎样？更重要地，技术的发展会帮助我们应对这些挑战，机器人技术的崛起，尤其是在制造业和服务业中，正逐步填补劳动市场的空缺。

未来机器人不仅能承担更多的劳动工作，还能在日常生活中为我们提供帮助，甚至可能改变整个社会结构。

看一看美国和俄罗斯，尽管他们的人口并不像中国那么庞大，美国约有3亿人口，俄罗斯则只有2亿多，但他们依旧是世界的强国，经济、科技、军事实力都不容小觑。

所以人口降一半，难道就意味着中国会不行吗？人口减少Backgrounds后面，未必就是衰退的前兆，更多的是一种自然的社会转型。

真正需要我们担心的，不是人口数量的多少，而是如何让科技和社会制度更好地融合，让我们的生活质量得到提升，而不是空洞的数字游戏。`,
    images: [
      "https://p3-sign.toutiaoimg.com/tos-cn-i-ezhpy3drpa/d1ef01ffdc484196bef32e3b8f897333~tplv-shrink:639:362.jpeg?_iz=97245&bid=15&from=post&gid=1831910043724936&lk3s=06827d14&x-expires=1757116800&x-signature=19vr3zdm2P7I%2FuKuq3F3wosaZtk%3D",
      "https://p3-sign.toutiaoimg.com/tos-cn-i-ezhpy3drpa/d1ef01ffdc484196bef32e3b8f897333~tplv-shrink:639:362.jpeg?_iz=97245&bid=15&from=post&gid=1831910043724936&lk3s=06827d14&x-expires=1757116800&x-signature=19vr3zdm2P7I%2FuKuq3F3wosaZtk%3D"
    ]
  },
  
  relatedArticles: [
    {
      id: '1',
      title: '中国人口结构变化对经济发展的深远影响',
      summary: '随着人口老龄化加剧，中国面临着前所未有的挑战和机遇，需要从多个维度来应对这一变化...',
      image: 'https://p3-sign.toutiaoimg.com/tos-cn-i-ezhpy3drpa/d1ef01ffdc484196bef32e3b8f897333~tplv-shrink:639:362.jpeg?_iz=97245&bid=15&from=post&gid=1831910043724936&lk3s=06827d14&x-expires=1757116800&x-signature=19vr3zdm2P7I%2FuKuq3F3wosaZtk%3D',
      author: '经济观察家',
      readCount: 8900,
      publishTime: '2小时前'
    },
    {
      id: '2',
      title: '科技发展如何重塑未来社会结构',
      summary: '人工智能和机器人技术的快速发展正在改变我们的生活方式，从工作到娱乐，无处不在...',
      image: 'https://p3-sign.toutiaoimg.com/tos-cn-i-ezhpy3drpa/d1ef01ffdc484196bef32e3b8f897333~tplv-shrink:639:362.jpeg?_iz=97245&bid=15&from=post&gid=1831910043724936&lk3s=06827d14&x-expires=1757116800&x-signature=19vr3zdm2P7I%2FuKuq3F3wosaZtk%3D',
      author: '科技前沿',
      readCount: 12300,
      publishTime: '4小时前'
    },
    {
      id: '3',
      title: '全球人口趋势：发达国家的共同挑战',
      summary: '不仅是日本，欧美发达国家都面临相似的人口问题，这是全球性的趋势和挑战...',
      image: 'https://p3-sign.toutiaoimg.com/tos-cn-i-ezhpy3drpa/d1ef01ffdc484196bef32e3b8f897333~tplv-shrink:639:362.jpeg?_iz=97245&bid=15&from=post&gid=1831910043724936&lk3s=06827d14&x-expires=1757116800&x-signature=19vr3zdm2P7I%2FuKuq3F3wosaZtk%3D',
      author: '国际观察',
      readCount: 6700,
      publishTime: '6小时前'
    },
    {
      id: '4',
      title: '机器人时代：劳动力市场的新变革',
      summary: '随着自动化技术的普及，传统的就业模式正在发生根本性的改变，新的机遇与挑战并存...',
      image: 'https://p3-sign.toutiaoimg.com/tos-cn-i-ezhpy3drpa/d1ef01ffdc484196bef32e3b8f897333~tplv-shrink:639:362.jpeg?_iz=97245&bid=15&from=post&gid=1831910043724936&lk3s=06827d14&x-expires=1757116800&x-signature=19vr3zdm2P7I%2FuKuq3F3wosaZtk%3D',
      author: '未来学者',
      readCount: 9800,
      publishTime: '8小时前'
    }
  ]
}

// Mock API 客户端
class MockApiClient {
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    // 模拟网络延迟
    await delay(Math.random() * 1000 + 500) // 500-1500ms 随机延迟
    
    let data: unknown
    
    switch (endpoint) {
      case '/article/info':
        data = mockData.articleInfo
        break
      case '/article/content':
        data = mockData.articleContent
        break
      case '/article/related':
        data = mockData.relatedArticles
        break
      default:
        throw new Error(`Unknown endpoint: ${endpoint}`)
    }
    
    return {
      timestamp: Date.now(),
      success: true,
      data: data as T,
      message: 'Mock data loaded successfully'
    }
  }
  
  async post<T>(endpoint: string, requestData?: Record<string, unknown>): Promise<ApiResponse<T>> {
    await delay(Math.random() * 800 + 300)
    
    return {
      timestamp: Date.now(),
      success: true,
      data: { id: Date.now(), ...requestData } as T,
      message: 'Mock post request successful'
    }
  }
  
  async put<T>(endpoint: string, requestData?: Record<string, unknown>): Promise<ApiResponse<T>> {
    await delay(Math.random() * 600 + 400)
    
    return {
      timestamp: Date.now(),
      success: true,
      data: requestData as T,
      message: 'Mock put request successful'
    }
  }
  
  async delete<T>(articleId: string): Promise<ApiResponse<T>> {
    await delay(Math.random() * 500 + 200);
    
    return {
      success: true,
      data: null as T,
      timestamp: Date.now(),
      message: 'Mock delete request successful'
    }
  }
}

export const apiClient = new MockApiClient()

// 文章相关 API 方法
export const articleApi = {
  getArticleInfo: () => apiClient.get<unknown>('/article/info'),
  getArticleContent: () => apiClient.get<unknown>('/article/content'),
  getRelatedArticles: () => apiClient.get<unknown[]>('/article/related'),
}

// 交互相关API
export const interactionApi = {
  likeArticle: (articleId: string) => apiClient.post<unknown>(`/article/${articleId}/like`),
  unlikeArticle: (articleId: string) => apiClient.delete<string>(`/article/${articleId}/like`),
  collectArticle: (articleId: string) => apiClient.post<unknown>(`/article/${articleId}/collect`),
  uncollectArticle: (articleId: string) => apiClient.delete<string>(`/article/${articleId}/collect`),
  shareArticle: (articleId: string, platform: string) => apiClient.post<unknown>(`/article/${articleId}/share`, { platform }),
}

export const fetchArticles = async (): Promise<ApiResponse<Article[]>> => {
  // 使用共享的类型和工具函数
  const response = await fetch('/api/articles');
  const data = await response.json();
  
  return {
    success: true,
    data: data.map((article: Article) => ({
      ...article,
      createdAt: formatDate(article.createdAt)
    })),
    message: 'Articles fetched successfully',
    timestamp: Date.now()
  };
};
