# 🚀 Zeabur部署指南

本指南将帮助您把AI工具集成平台部署到Zeabur云平台，让全世界都能访问您的网站！

## ✅ 准备工作已完成

- ✓ 已创建 `package.json`（Node.js配置）
- ✓ 已创建 `server.js`（Express服务器）
- ✓ 已创建 `zbpack.json`（Zeabur配置）
- ✓ 已初始化Git仓库
- ✓ 已提交所有代码

## 📋 部署方式选择

Zeabur支持三种部署方式，您可以选择最适合的：

### 方式一：GitHub仓库部署（推荐⭐）

**优点**：自动化、支持持续部署、便于版本管理
**适合**：有GitHub账号的用户

### 方式二：Zeabur CLI部署

**优点**：命令行操作、快速简单
**适合**：熟悉命令行的用户

### 方式三：本地Git推送

**优点**：不需要GitHub账号
**适合**：想要快速部署的用户

---

## 🎯 方式一：GitHub仓库部署（推荐）

### 步骤1：创建GitHub仓库

1. **访问GitHub**
   ```
   https://github.com/new
   ```

2. **创建新仓库**
   - Repository name: `ai-tools-hub`
   - Description: `AI工具集成平台 - 集成32款AI工具`
   - Public 或 Private（都可以）
   - **不要**勾选 "Add a README file"（我们已经有了）
   - 点击 "Create repository"

### 步骤2：推送代码到GitHub

在终端中运行以下命令：

```bash
cd /Users/shihao.eth/ai-tools-hub

# 添加GitHub远程仓库（替换YOUR_USERNAME为您的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/ai-tools-hub.git

# 推送代码
git branch -M main
git push -u origin main
```

**注意**：如果提示需要登录，输入您的GitHub用户名和Personal Access Token。

### 步骤3：在Zeabur导入项目

1. **访问Zeabur**
   ```
   https://zeabur.com
   ```

2. **登录/注册**
   - 可以使用GitHub账号直接登录

3. **创建新项目**
   - 点击 "New Project"
   - 选择一个区域（推荐：Hong Kong 或 Singapore）
   - 点击 "Create"

4. **添加服务**
   - 点击 "Add Service"
   - 选择 "Git"
   - 选择您的GitHub仓库 `ai-tools-hub`
   - Zeabur会自动检测到Node.js项目

5. **等待部署完成**
   - Zeabur会自动：
     - 安装依赖（npm install）
     - 启动服务（npm start）
   - 通常需要1-2分钟

6. **获取访问地址**
   - 部署完成后，点击 "Networking"
   - 点击 "Generate Domain"
   - 会得到一个类似 `xxx.zeabur.app` 的域名
   - 点击域名即可访问！

### 步骤4：绑定自定义域名（可选）

如果您有自己的域名：

1. 在Zeabur项目中点击 "Networking"
2. 点击 "Custom Domain"
3. 输入您的域名（如 `ai-tools.yourdomain.com`）
4. 在您的域名DNS设置中添加CNAME记录
5. 等待DNS生效（通常5-30分钟）

---

## 🎯 方式二：Zeabur CLI部署

### 步骤1：安装Zeabur CLI

```bash
# macOS/Linux
curl -fsSL https://zeabur.com/install.sh | bash

# 或者使用npm
npm install -g @zeabur/cli
```

### 步骤2：登录Zeabur

```bash
zeabur auth login
```

会打开浏览器，完成登录授权。

### 步骤3：部署项目

```bash
cd /Users/shihao.eth/ai-tools-hub

# 部署
zeabur deploy
```

按照提示：
1. 选择或创建项目
2. 选择区域（推荐 Hong Kong）
3. 等待部署完成

### 步骤4：查看部署状态

```bash
zeabur status
```

会显示部署URL和状态。

---

## 🎯 方式三：本地Git推送

### 步骤1：登录Zeabur并创建项目

1. 访问 https://zeabur.com 并登录
2. 创建新项目
3. 选择区域

### 步骤2：使用Zeabur Git方式部署

1. 在项目中点击 "Add Service"
2. 选择 "Git"
3. 选择 "Deploy from Local"
4. 按照页面指示获取Git URL

### 步骤3：推送代码

```bash
cd /Users/shihao.eth/ai-tools-hub

# 添加Zeabur远程仓库（使用页面显示的URL）
git remote add zeabur <ZEABUR_GIT_URL>

# 推送代码
git push zeabur main
```

---

## 🔧 环境变量配置（可选）

如果您想在服务器端存储DeepSeek API Key：

1. 在Zeabur项目中点击您的服务
2. 点击 "Variables"
3. 添加环境变量：
   ```
   Key: DEEPSEEK_API_KEY
   Value: sk-785048fc14194b56b9dde959040cc765
   ```
4. 保存并重新部署

**注意**：由于前端直接调用DeepSeek API，API Key会暴露在客户端。建议：
- 为生产环境创建单独的API Key
- 在DeepSeek后台设置使用限额
- 或者创建后端代理（高级功能）

---

## 📊 部署后验证

部署完成后，访问您的网站并检查：

- ✅ 页面能正常打开
- ✅ 所有32个工具卡片正常显示
- ✅ 分类筛选功能正常
- ✅ DeepSeek聊天窗口能打开
- ✅ 能够与DeepSeek对话（需要配置API Key）

---

## 🎨 自定义配置

### 更改端口（如果需要）

编辑 `server.js`：
```javascript
const PORT = process.env.PORT || 3000; // 修改这里
```

### 添加HTTPS

Zeabur自动提供HTTPS，无需额外配置！

### 启用Gzip压缩

编辑 `server.js`，添加：
```javascript
const compression = require('compression');
app.use(compression());
```

然后运行：
```bash
npm install compression
git add .
git commit -m "添加Gzip压缩"
git push
```

---

## 📈 监控和维护

### 查看日志

在Zeabur控制台：
1. 进入您的项目
2. 点击服务名称
3. 点击 "Logs" 标签
4. 实时查看服务器日志

### 查看资源使用

在服务详情页面可以看到：
- CPU使用率
- 内存使用率
- 网络流量
- 请求数量

### 重新部署

**方式1**（如果使用GitHub）：
```bash
cd /Users/shihao.eth/ai-tools-hub
# 修改代码...
git add .
git commit -m "更新功能"
git push
```
Zeabur会自动重新部署！

**方式2**（手动触发）：
在Zeabur控制台点击 "Redeploy" 按钮

---

## 🔒 安全建议

1. **API Key保护**
   - 不要在代码中硬编码敏感信息
   - 使用环境变量
   - 定期轮换API Key

2. **域名安全**
   - 使用HTTPS（Zeabur默认启用）
   - 考虑添加WAF（Web应用防火墙）

3. **访问控制**
   - 如需限制访问，可以添加身份验证
   - 使用Zeabur的访问控制功能

---

## 🆘 常见问题

### Q1: 部署失败，显示"Build failed"？

**解决方法**：
1. 检查 `package.json` 是否正确
2. 查看Zeabur构建日志，找到具体错误
3. 确认Node.js版本兼容（我们使用 >=18.0.0）

### Q2: 网站打开很慢？

**解决方法**：
1. 选择离用户更近的区域
2. 启用Gzip压缩
3. 考虑升级Zeabur套餐

### Q3: DeepSeek API调用失败？

**解决方法**：
1. 检查API Key是否正确配置
2. 确认浏览器能访问 `api.deepseek.com`
3. 查看浏览器控制台错误信息

### Q4: 如何更新网站内容？

**方法1**（推荐）：
```bash
# 修改代码后
git add .
git commit -m "更新内容"
git push
```

**方法2**：
在Zeabur控制台手动上传文件

### Q5: 部署后API Key暴露怎么办？

**方案1**（简单）：
在前端让用户自己输入API Key

**方案2**（推荐）：
创建后端代理：
1. 在服务器端调用DeepSeek API
2. 前端调用您的服务器API
3. API Key只存在服务器端

---

## 💰 费用说明

Zeabur提供：
- **免费套餐**：适合个人项目
  - 每月5美元免费额度
  - 基础资源配置
  - 足够运行本项目

- **付费套餐**：需要更多资源时
  - 按使用量计费
  - 更多CPU和内存
  - 更好的性能

---

## 📚 相关资源

- **Zeabur官方文档**: https://zeabur.com/docs
- **Zeabur Discord社区**: https://discord.gg/zeabur
- **GitHub仓库**: 您的仓库地址

---

## 🎉 部署完成后的下一步

1. ✅ **分享您的网站**
   - 发送链接给朋友
   - 在社交媒体分享

2. ✅ **添加自定义域名**
   - 让网站更专业

3. ✅ **监控性能**
   - 定期查看Zeabur控制台

4. ✅ **收集反馈**
   - 让用户试用并提供建议

5. ✅ **持续优化**
   - 根据用户反馈改进功能
   - 添加更多AI工具

---

**恭喜！现在您的AI工具集成平台可以被全世界访问了！** 🌍

需要帮助？随时咨询DeepSeek助手或查看本指南。
