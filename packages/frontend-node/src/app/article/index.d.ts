interface InitialData {
  article: {
    title: string;
    author: {
      name: string;
      avatar: string;
      verified: boolean;
    };
    publishTime: string;
    readCount: number;
    summary: string;
  };
  meta: {
    timestamp: number;
    version: string;
  };
}

interface ArticleContent {
  content: string;
  images: string[];
}

interface RelatedArticle {
  id: string;
  title: string;
  summary: string;
  author: string;
  readCount: number;
  publishTime: string;
}