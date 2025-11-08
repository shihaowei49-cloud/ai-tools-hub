# 🤖 DeepSeek协作工作流程

本文档说明如何通过DeepSeek来规划和指导您的工作。

## 📋 工作流程概述

根据您的需求，所有未来的指令都将先与DeepSeek沟通，然后由DeepSeek指导具体的工作。这个流程已经集成到本平台中。

## 🔄 三种DeepSeek协作方式

### 方式一：网页端DeepSeek助手（推荐新手）

这是最简单的方式，直接在网页中使用：

1. **打开AI工具集成平台**
   - 双击 `启动页面.command` 或
   - 直接打开 `index.html`

2. **点击"💬 DeepSeek助手"按钮**
   - 在右下角会弹出聊天窗口

3. **开始对话**
   ```
   示例问题：
   - "我想给客户做一个产品介绍PPT，应该怎么做？"
   - "帮我规划一个视频制作的完整流程"
   - "推荐一个适合写技术博客的AI工具"
   ```

4. **DeepSeek会给出建议**
   - 推荐合适的AI工具
   - 提供详细的使用步骤
   - 解答您的疑问

### 方式二：命令行DeepSeek规划器（适合复杂任务）

这种方式适合需要详细规划的复杂项目：

1. **进入项目目录**
   ```bash
   cd /Users/shihao.eth/multi-agent-supervisor
   ```

2. **运行DeepSeek咨询脚本**
   ```bash
   node consult-deepseek.js
   ```

3. **或者获取工具详情**
   ```bash
   node get-tool-details.js
   ```

4. **查看DeepSeek的规划建议**
   - 会获得分步骤的详细计划
   - 适合需要系统性规划的任务

### 方式三：自定义DeepSeek咨询（高级用户）

如果您有特定的咨询需求，可以创建自定义脚本：

```javascript
import { DeepSeekPlanner } from './agents/deepseek-planner.js';
import dotenv from 'dotenv';

dotenv.config();

const planner = new DeepSeekPlanner({
    api_key: process.env.DEEPSEEK_API_KEY,
    model: 'deepseek-chat'
});

// 您的具体任务描述
const task = `
在这里描述您的任务...
`;

planner.plan(task)
    .then(plan => {
        console.log('📋 DeepSeek的建议：\n');
        console.log(plan);
    })
    .catch(error => {
        console.error('错误:', error.message);
    });
```

## 💡 实际使用场景示例

### 场景1：制作营销视频

**您的指令**：
```
"我想制作一个产品营销视频，从脚本到成片"
```

**DeepSeek的工作流程**：
1. 分析您的需求
2. 推荐工具组合：
   - Jasper/Copy.ai（脚本创作）
   - Synthesia/Runway（视频生成）
   - Murf（配音）
3. 给出详细步骤：
   ```
   1. 使用Jasper创建视频脚本
   2. 使用Synthesia生成AI虚拟主播视频
   3. 使用Murf生成专业配音
   4. 使用Descript进行后期剪辑
   ```

### 场景2：数据分析报告

**您的指令**：
```
"我有一份销售数据，想做可视化分析报告"
```

**DeepSeek的建议**：
1. 推荐工具：Tableau 或 Power BI
2. 提供步骤：
   ```
   1. 使用Akkio进行初步数据分析和预测
   2. 使用Tableau创建可视化图表
   3. 使用Jasper生成数据分析报告文本
   4. 使用Gamma将分析结果制作成PPT
   ```

### 场景3：多语言内容创作

**您的指令**：
```
"我想写一篇技术博客，并翻译成多种语言"
```

**DeepSeek的工作流程**：
1. 推荐工具组合
2. 详细步骤：
   ```
   1. 使用Writesonic撰写原始博客（英文）
   2. 使用QuillBot进行润色和改写
   3. 使用DeepL翻译成中文、日文、韩文等
   4. 使用Google Translate做最后的多语言检查
   ```

## 🎯 DeepSeek指导下的工作模式

### 推荐的工作流程：

```
您的需求
   ↓
咨询DeepSeek（网页或命令行）
   ↓
DeepSeek分析需求
   ↓
DeepSeek推荐工具 + 提供步骤
   ↓
您按照建议执行
   ↓
遇到问题？继续咨询DeepSeek
   ↓
完成任务 ✅
```

## 📝 有效提问技巧

为了获得最好的DeepSeek建议，建议这样提问：

### ✅ 好的提问方式：
```
- "我想制作一个5分钟的产品介绍视频，预算有限，推荐哪些AI工具？"
- "我需要将一份50页的PDF文档转换成PPT，并添加AI生成的图片，怎么做？"
- "我是编程新手，想用AI帮我写一个简单的网页，应该用哪些工具？"
```

### ❌ 不好的提问方式：
```
- "推荐工具"（太笼统）
- "怎么做视频"（缺乏细节）
- "哪个AI好用"（目标不明确）
```

## 🔧 故障排除

### DeepSeek助手无响应？

1. **检查API Key**
   - 打开网页端 → 点击"⚙️ API配置"
   - 确认API Key是否正确：`sk-785048fc14194b56b9dde959040cc765`

2. **检查网络连接**
   - 确保能访问互联网
   - 尝试访问 https://platform.deepseek.com 测试连接

3. **查看浏览器控制台**
   - 按F12打开开发者工具
   - 查看Console标签页是否有错误信息

4. **清除缓存重试**
   - 清除浏览器缓存
   - 刷新页面

### 命令行脚本报错？

1. **确认.env文件配置**
   ```bash
   cd /Users/shihao.eth/multi-agent-supervisor
   cat .env
   ```

   应该包含：
   ```
   DEEPSEEK_API_KEY=sk-785048fc14194b56b9dde959040cc765
   ```

2. **确认依赖已安装**
   ```bash
   npm install
   ```

3. **查看错误信息**
   - 仔细阅读终端输出的错误信息
   - 常见错误：网络问题、API额度用尽

## 📚 进阶使用

### 创建您自己的DeepSeek助手

您可以修改 `js/app.js` 中的系统提示词，定制DeepSeek的行为：

```javascript
const systemPrompt = `你是一个[您的定制角色]...`;
```

### 集成更多AI工具

1. 编辑 `index.html`
2. 在相应分类下添加新工具卡片
3. 更新 `js/app.js` 中的系统提示词，告诉DeepSeek新增的工具

### 导出DeepSeek建议

所有对话都保存在浏览器LocalStorage中，您可以：
- 手动复制聊天内容
- 或者添加导出功能（需要修改JavaScript代码）

## 🎓 学习资源

- **DeepSeek官方文档**：https://platform.deepseek.com/docs
- **API使用指南**：查看 `/multi-agent-supervisor/agents/deepseek-planner.js`
- **示例脚本**：
  - `consult-deepseek.js` - 完整咨询流程
  - `get-tool-details.js` - 获取工具详情

## 🌟 最佳实践

1. **明确需求**：在咨询DeepSeek前，先想清楚您的具体目标
2. **分步执行**：按照DeepSeek的建议一步步来，不要跳步
3. **及时反馈**：遇到问题立即咨询DeepSeek，不要自己猜测
4. **记录经验**：将有效的工作流程记录下来，方便下次使用
5. **灵活调整**：DeepSeek的建议是参考，可以根据实际情况调整

## 📞 需要帮助？

如果您对DeepSeek工作流程有任何疑问：

1. **直接问DeepSeek**（网页端聊天窗口）
2. **查看README.md**
3. **检查示例脚本**

---

**让DeepSeek成为您的智能工作伙伴！** 🚀
