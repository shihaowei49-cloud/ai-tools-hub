const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 启用CORS，允许跨域请求DeepSeek API
app.use(cors());

// 托管静态文件
app.use(express.static(__dirname));

// 路由 - 所有请求都返回index.html（用于单页应用）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 AI工具集成平台已启动！`);
  console.log(`📡 访问地址: http://localhost:${PORT}`);
  console.log(`🤖 DeepSeek智能助手已就绪`);
});
