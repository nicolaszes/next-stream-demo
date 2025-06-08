import { InitialData, Article } from '../types';

/**
 * 数据服务类 - 负责提供各种数据
 */
export class DataService {
  /**
   * 获取首屏初始数据
   */
  static getInitialData(): InitialData {
    return {
      article: {
        title: "今日的日本，可能就是20年后的中国！",
        author: {
          name: "半桶吃半碗",
          avatar: "https://p26-sign.toutiaoimg.com/user-avatar/c2916fc164725e571bcbd5b98b1b9cd4~300x300.image",
          verified: true
        },
        publishTime: "2024-01-15 14:30",
        readCount: 12500,
        summary: "日本的现状确实有很多地方值得中国警惕，日本如今的单身社会现象很严重..."
      },
      meta: {
        timestamp: Date.now(),
        version: '1.0.0'
      }
    };
  }

  /**
   * 获取文章内容数据（模拟）
   */
  static async getArticleContent(): Promise<any> {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      content: [
        {
          type: 'paragraph',
          text: '日本的现状确实有很多地方值得中国警惕，日本如今的单身社会现象很严重，年轻人不愿意结婚生子，老龄化问题日益严重。'
        },
        {
          type: 'image',
          src: 'https://p3-sign.toutiaoimg.com/tos-cn-i-6w9my0ksvp/example-image.jpg',
          alt: '日本社会现状'
        },
        {
          type: 'paragraph',
          text: '这种现象的背后，反映的是经济发展到一定阶段后，社会结构和价值观念的深刻变化。中国作为后发国家，应该从日本的经验中汲取教训。'
        }
      ]
    };
  }
}