import express from 'express';
import cors from 'cors';
import { DataService } from './services/dataService';
import { HtmlGenerator } from './services/htmlGenerator';

const app = express();
const PORT = process.env.PORT || 3003;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 创建HTML生成器实例
const htmlGenerator = new HtmlGenerator({
  nextjsBaseUrl: process.env.NEXTJS_BASE_URL || 'http://localhost:3002',
  enableCache: process.env.NODE_ENV === 'production'
});

// 首页路由
app.get('/', (_req, res) => {
  try {
    const homeData = {
      title: 'Next.js + Node.js 集成应用',
      description: '基于Next.js App Router + Node.js后端的移动端应用'
    };
    const htmlContent = htmlGenerator.generateHomeHTML(homeData);
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', process.env.NODE_ENV === 'production' ? 'public, max-age=300' : 'no-cache');
    res.send(htmlContent);
  } catch (error) {
    console.error('生成首页HTML失败:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 文章页面路由（已存在）
app.get('/article', (_req, res) => {
  try {
    const initialData = DataService.getInitialData();
    const htmlContent = htmlGenerator.generateHTML(initialData);
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', process.env.NODE_ENV === 'production' ? 'public, max-age=300' : 'no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.send(htmlContent);
  } catch (error) {
    console.error('生成首屏HTML失败:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 健康检查
app.get('/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 错误处理中间件
app.use((err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('服务器错误:', err);
  res.status(500).json({ error: '服务器内部错误' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📄 Initial HTML: http://localhost:${PORT}/article`);
  console.log(`🔍 Health check: http://localhost:${PORT}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});