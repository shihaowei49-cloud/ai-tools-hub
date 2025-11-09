# 🚀 快速部署到Zeabur（3分钟完成）

## 方式一：使用一键部署脚本（最简单⭐）

```bash
cd /Users/shihao.eth/ai-tools-hub
./一键部署.sh
```

脚本会自动：
1. 打开GitHub创建仓库页面
2. 推送代码到GitHub
3. 打开Zeabur网站
4. 引导您完成部署

---

## 方式二：手动部署（详细步骤）

### 第一步：在GitHub创建仓库（1分钟）

1. **访问**：https://github.com/new

2. **填写信息**：
   - Repository name: `ai-tools-hub`
   - Description: `AI工具集成平台 - 集成32款AI工具`
   - 选择 **Public**（公开）
   - **不要勾选** 任何初始化选项

3. **点击** "Create repository"

### 第二步：推送代码到GitHub（30秒）

在终端运行：

```bash
cd /Users/shihao.eth/ai-tools-hub

# 添加远程仓库
git remote add origin https://github.com/shihaowei49-cloud/ai-tools-hub.git

# 推送代码
git push -u origin main
```

✅ 看到 "Branch 'main' set up to track remote branch 'main'" 表示成功！

### 第三步：在Zeabur导入项目（1分钟）

1. **访问** https://zeabur.com

2. **登录**
   - 点击 "Sign in with GitHub"（推荐）
   - 授权Zeabur访问您的GitHub

3. **创建项目**
   - 点击 "New Project"
   - Project name: `ai-tools-hub`（或任意名称）
   - 选择区域：**Hong Kong** 🇭🇰（推荐，离中国最近）
   - 点击 "Create"

4. **添加服务**
   - 点击 "Add Service"
   - 选择 "Git"
   - 在仓库列表中选择 `ai-tools-hub`
   - Zeabur会自动检测到Node.js项目

5. **等待部署**
   - 自动安装依赖
   - 自动启动服务
   - 约1-2分钟完成

6. **获取访问地址**
   - 部署成功后，点击 "Networking" 标签
   - 点击 "Generate Domain"
   - 会得到类似 `ai-tools-hub-xxx.zeabur.app` 的域名
   - 点击域名即可访问！

---

## 🎉 部署完成！

访问您的网站：`https://your-domain.zeabur.app`

### 验证清单

访问网站后检查：
- ✅ 页面正常加载
- ✅ 32个AI工具卡片显示正常
- ✅ 分类筛选功能正常
- ✅ DeepSeek聊天窗口能打开

### 配置DeepSeek API

1. 点击右下角 "💬 DeepSeek助手"
2. 点击 "⚙️ API配置"
3. API Key已预填充，如需更换请输入新的

---

## 🔄 更新网站内容

以后修改网站内容后，只需：

```bash
cd /Users/shihao.eth/ai-tools-hub

# 修改代码...

git add .
git commit -m "更新内容"
git push
```

Zeabur会自动重新部署！⚡

---

## 📊 部署状态监控

在Zeabur控制台可以查看：
- 📈 CPU和内存使用率
- 📡 网络流量
- 📝 实时日志
- ⚠️ 错误警告

---

## 🌟 进阶功能

### 绑定自定义域名

如果您有自己的域名（如 `ai-tools.com`）：

1. 在Zeabur项目 → Networking → Custom Domain
2. 输入您的域名
3. 在域名DNS设置中添加CNAME记录：
   ```
   ai-tools CNAME xxx.zeabur.app
   ```
4. 等待DNS生效（5-30分钟）

### 设置环境变量

在Zeabur项目中：
1. 点击您的服务
2. 点击 "Variables" 标签
3. 添加环境变量（如DEEPSEEK_API_KEY）
4. 保存后会自动重新部署

### 查看访问统计

在Zeabur控制台可以看到：
- 每日访问量
- 地理位置分布
- 响应时间统计

---

## ❓ 常见问题

### Q: 部署失败怎么办？

1. 查看Zeabur的 "Logs" 标签
2. 找到具体错误信息
3. 常见原因：
   - package.json配置错误
   - 依赖安装失败
   - 端口配置问题

### Q: 网站访问很慢？

1. 检查选择的区域是否离您的用户近
2. 考虑升级Zeabur套餐
3. 启用CDN加速

### Q: 如何删除部署？

1. 进入Zeabur项目
2. 点击服务右上角的 "..."
3. 选择 "Delete"

---

## 💰 费用说明

Zeabur提供：
- **免费套餐**：每月5美元免费额度
  - 足够个人项目使用
  - 包含基础资源

- **付费套餐**：按使用量计费
  - 更多CPU和内存
  - 更快的响应速度
  - 专业技术支持

---

## 📚 相关链接

- **GitHub仓库**: https://github.com/shihaowei49-cloud/ai-tools-hub
- **Zeabur控制台**: https://zeabur.com/dashboard
- **DeepSeek平台**: https://platform.deepseek.com
- **详细部署指南**: ZEABUR部署指南.md

---

## 🎯 下一步

部署完成后：

1. ✅ **测试所有功能**
2. ✅ **分享给朋友**
3. ✅ **收集反馈**
4. ✅ **持续优化**

---

**部署遇到问题？**
- 查看 `ZEABUR部署指南.md` 获取更详细的帮助
- 或咨询DeepSeek助手

**祝您部署顺利！** 🎊
