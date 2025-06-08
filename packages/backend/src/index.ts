import { ApiResponse, Article, HTTP_STATUS } from '@next-stream-demo/shared';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 静态 HTML 路由
app.get('/api/static-html', (req, res) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>静态 HTML 页面</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                line-height: 1.6;
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 20px;
            }
            .content {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #667eea;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>Backend 静态 HTML 服务</h1>
            <p>这是由 Node.js 后端服务返回的静态 HTML 内容</p>
        </div>
        <div class="content">
            <h2>服务信息</h2>
            <ul>
                <li>服务端口: ${PORT}</li>
                <li>生成时间: ${new Date().toLocaleString('zh-CN')}</li>
                <li>请求路径: ${req.path}</li>
            </ul>
            <h3>功能特性</h3>
            <p>这个后端服务可以：</p>
            <ul>
                <li>返回动态生成的 HTML 内容</li>
                <li>提供 API 接口</li>
                <li>处理静态文件</li>
                <li>与前端 Next.js 应用协同工作</li>
            </ul>
        </div>
    </body>
    </html>
  `;
  
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(htmlContent);
});

// API 路由
app.get('/api/articles', (req, res) => {
  const response: ApiResponse<Article[]> = {
    success: true,
    data: [],
    message: 'Articles retrieved successfully',
    timestamp: Date.now()
  };
  
  res.status(HTTP_STATUS.OK).json(response);
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 启动服务
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📄 Static HTML available at http://localhost:${PORT}/api/static-html`);
  console.log(`🔍 Health check: http://localhost:${PORT}/health`);
});