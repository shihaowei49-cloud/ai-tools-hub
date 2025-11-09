#!/bin/bash

echo "═══════════════════════════════════════════════════════════"
echo "🚀 AI工具集成平台 - 一键部署到Zeabur"
echo "═══════════════════════════════════════════════════════════"
echo ""

cd /Users/shihao.eth/ai-tools-hub

echo "📝 第一步：创建GitHub仓库"
echo "───────────────────────────────────────────────────────────"
echo ""
echo "浏览器将打开GitHub创建仓库页面，请："
echo "  1. 确认仓库名为: ai-tools-hub"
echo "  2. 保持Public（公开）选项"
echo "  3. 不要勾选任何初始化选项"
echo "  4. 点击 'Create repository' 按钮"
echo ""
read -p "按回车键打开GitHub..."

open "https://github.com/new?name=ai-tools-hub&description=AI%E5%B7%A5%E5%85%B7%E9%9B%86%E6%88%90%E5%B9%B3%E5%8F%B0%20-%20%E9%9B%86%E6%88%9032%E6%AC%BEAI%E5%B7%A5%E5%85%B7%EF%BC%8C%E5%B8%A6DeepSeek%E6%99%BA%E8%83%BD%E5%8A%A9%E6%89%8B&visibility=public"

echo ""
read -p "创建完成后，按回车继续..."

echo ""
echo "📤 第二步：推送代码到GitHub"
echo "───────────────────────────────────────────────────────────"
echo ""

# 检查是否已有远程仓库
if git remote get-url origin &> /dev/null; then
    echo "检测到已配置的GitHub仓库"
else
    # 添加新的远程仓库（不包含token）
    git remote add origin https://github.com/shihaowei49-cloud/ai-tools-hub.git
fi

echo "正在推送代码到GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 代码已成功推送到GitHub！"
    echo ""
else
    echo ""
    echo "❌ 推送失败，请检查："
    echo "  1. 仓库是否创建成功"
    echo "  2. 仓库名是否为 ai-tools-hub"
    echo "  3. 网络连接是否正常"
    echo ""
    exit 1
fi

echo "🌐 第三步：在Zeabur导入项目"
echo "───────────────────────────────────────────────────────────"
echo ""
echo "接下来在Zeabur上导入您的GitHub仓库："
echo ""
echo "  1. 访问 https://zeabur.com（将自动打开）"
echo "  2. 登录（建议用GitHub账号登录）"
echo "  3. 点击 'New Project'"
echo "  4. 选择区域（推荐 Hong Kong 🇭🇰）"
echo "  5. 点击 'Create'"
echo "  6. 点击 'Add Service' → 选择 'Git'"
echo "  7. 选择 'ai-tools-hub' 仓库"
echo "  8. 等待自动部署完成（约1-2分钟）"
echo "  9. 点击 'Networking' → 'Generate Domain'"
echo " 10. 获取您的网站地址！"
echo ""
read -p "按回车键打开Zeabur..."

open "https://zeabur.com"

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "✅ 部署准备完成！"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "📌 重要提示："
echo "  • GitHub仓库: https://github.com/shihaowei49-cloud/ai-tools-hub"
echo "  • 部署后记得配置DeepSeek API Key"
echo "  • 详细文档请查看: ZEABUR部署指南.md"
echo ""
echo "🎉 祝您部署顺利！"
echo ""
