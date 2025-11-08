#!/bin/bash
# AI工具集成平台 - 快速启动脚本

# 获取脚本所在目录
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# 在默认浏览器中打开index.html
open "$DIR/index.html"

echo "✅ AI工具集成平台已在浏览器中打开！"
echo "📋 如需帮助，请查看 README.md 文件"
