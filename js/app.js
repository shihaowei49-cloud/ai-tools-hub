/**
 * AI工具集成平台 - 主应用脚本
 * 集成DeepSeek智能助手
 */

// 全局配置
const CONFIG = {
    DEEPSEEK_API_URL: 'https://api.deepseek.com/v1/chat/completions',
    MODEL: 'deepseek-chat',
    MAX_TOKENS: 2000,
    TEMPERATURE: 0.7
};

// 聊天历史
let chatHistory = [];

/**
 * 页面加载完成后初始化
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('AI工具集成平台已加载');
    loadChatHistory();
    initializeEventListeners();
});

/**
 * 初始化事件监听器
 */
function initializeEventListeners() {
    // 监听API Key输入变化，自动保存到本地存储
    const apiKeyInput = document.getElementById('apiKey');
    if (apiKeyInput) {
        apiKeyInput.addEventListener('change', function() {
            localStorage.setItem('deepseek_api_key', this.value);
        });

        // 加载已保存的API Key
        const savedApiKey = localStorage.getItem('deepseek_api_key');
        if (savedApiKey) {
            apiKeyInput.value = savedApiKey;
        }
    }
}

/**
 * 切换聊天窗口显示/隐藏
 */
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.classList.toggle('active');

    // 如果打开聊天窗口，聚焦到输入框
    if (chatWindow.classList.contains('active')) {
        document.getElementById('chatInput').focus();
    }
}

/**
 * 滚动到指定区域
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * 打开AI工具链接
 */
function openTool(url) {
    window.open(url, '_blank');
}

/**
 * 分类筛选功能
 */
function filterCategory(category) {
    // 更新按钮状态
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // 显示/隐藏工具卡片
    const categoryGroups = document.querySelectorAll('.category-group');
    categoryGroups.forEach(group => {
        if (category === 'all') {
            group.classList.remove('hidden');
        } else {
            if (group.getAttribute('data-category') === category) {
                group.classList.remove('hidden');
            } else {
                group.classList.add('hidden');
            }
        }
    });
}

/**
 * 处理聊天输入框的回车键事件
 */
function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

/**
 * 发送消息到DeepSeek
 */
async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) {
        return;
    }

    // 清空输入框
    input.value = '';

    // 添加用户消息到聊天窗口
    addMessage(message, 'user');

    // 将消息添加到历史记录
    chatHistory.push({
        role: 'user',
        content: message
    });

    // 显示加载中状态
    const loadingId = addLoadingMessage();

    try {
        // 调用DeepSeek API
        const response = await callDeepSeekAPI(message);

        // 移除加载消息
        removeLoadingMessage(loadingId);

        // 添加AI回复到聊天窗口
        addMessage(response, 'ai');

        // 将AI回复添加到历史记录
        chatHistory.push({
            role: 'assistant',
            content: response
        });

        // 保存聊天历史
        saveChatHistory();

    } catch (error) {
        // 移除加载消息
        removeLoadingMessage(loadingId);

        // 显示错误消息
        addMessage(`抱歉，发生了错误：${error.message}`, 'ai');
        console.error('DeepSeek API错误:', error);
    }
}

/**
 * 调用DeepSeek API
 */
async function callDeepSeekAPI(userMessage) {
    const apiKey = document.getElementById('apiKey').value;

    if (!apiKey || apiKey === 'sk-...') {
        throw new Error('请先配置DeepSeek API Key');
    }

    // 构建系统提示词
    const systemPrompt = `你是一个AI工具专家助手，精通各种AI工具的使用和推荐。

你的职责：
1. 根据用户需求推荐合适的AI工具
2. 解答AI工具的使用问题
3. 帮助用户规划工作流程
4. 提供技术建议和最佳实践

当前平台集成的工具分类：
- 📄 文档处理：Gamma、Lumin PDF、Smallpdf、Docsumo
- 🎬 视频处理：Runway、Descript、Synthesia、Pictory
- ✍️ 文章创作：Jasper、Copy.ai、QuillBot、Writesonic
- 🎵 音乐音频：AIVA、Murf、Lalal.ai、Amper Music
- 🎨 图像处理：Midjourney、DALL-E、Remove.bg、Prisma
- 💻 代码开发：GitHub Copilot、Tabnine、DeepCode、Kite
- 🌐 翻译工具：DeepL、Google Translate、Microsoft Translator、Amazon Translate
- 📊 数据分析：Tableau、Power BI、Akkio、MonkeyLearn

请用简洁、友好、专业的方式回答用户问题。如果用户询问工具推荐，请基于上述工具列表进行推荐。`;

    // 构建消息历史（保留最近10条消息以节省tokens）
    const messages = [
        { role: 'system', content: systemPrompt }
    ];

    // 添加最近的聊天历史
    const recentHistory = chatHistory.slice(-10);
    messages.push(...recentHistory);

    // 添加当前用户消息
    messages.push({
        role: 'user',
        content: userMessage
    });

    // 调用API
    const response = await fetch(CONFIG.DEEPSEEK_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: CONFIG.MODEL,
            messages: messages,
            temperature: CONFIG.TEMPERATURE,
            max_tokens: CONFIG.MAX_TOKENS
        })
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API请求失败 (${response.status}): ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('API返回数据格式异常');
    }

    return data.choices[0].message.content;
}

/**
 * 添加消息到聊天窗口
 */
function addMessage(content, type) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;

    // 将换行符转换为<br>标签，并保留格式
    const formattedContent = formatMessage(content);
    messageDiv.innerHTML = formattedContent;

    messagesContainer.appendChild(messageDiv);

    // 滚动到底部
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    return messageDiv;
}

/**
 * 格式化消息内容（支持Markdown基本格式）
 */
function formatMessage(content) {
    // 转义HTML
    let formatted = content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // 转换换行符
    formatted = formatted.replace(/\n/g, '<br>');

    // 转换粗体 **text**
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // 转换斜体 *text*
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // 转换代码块 `code`
    formatted = formatted.replace(/`(.*?)`/g, '<code>$1</code>');

    // 转换列表项
    formatted = formatted.replace(/^- (.+)$/gm, '<li>$1</li>');
    if (formatted.includes('<li>')) {
        formatted = formatted.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    }

    return formatted;
}

/**
 * 添加加载中消息
 */
function addLoadingMessage() {
    const messagesContainer = document.getElementById('chatMessages');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message ai-message';
    loadingDiv.innerHTML = '<div class="loading"></div> 思考中...';
    loadingDiv.id = 'loading-message-' + Date.now();

    messagesContainer.appendChild(loadingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    return loadingDiv.id;
}

/**
 * 移除加载中消息
 */
function removeLoadingMessage(loadingId) {
    const loadingDiv = document.getElementById(loadingId);
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

/**
 * 保存聊天历史到本地存储
 */
function saveChatHistory() {
    try {
        // 只保存最近20条消息
        const recentHistory = chatHistory.slice(-20);
        localStorage.setItem('chat_history', JSON.stringify(recentHistory));
    } catch (error) {
        console.error('保存聊天历史失败:', error);
    }
}

/**
 * 从本地存储加载聊天历史
 */
function loadChatHistory() {
    try {
        const saved = localStorage.getItem('chat_history');
        if (saved) {
            chatHistory = JSON.parse(saved);

            // 重新显示聊天历史（跳过系统消息）
            const messagesContainer = document.getElementById('chatMessages');

            chatHistory.forEach(msg => {
                if (msg.role === 'user') {
                    addMessage(msg.content, 'user');
                } else if (msg.role === 'assistant') {
                    addMessage(msg.content, 'ai');
                }
            });
        }
    } catch (error) {
        console.error('加载聊天历史失败:', error);
        chatHistory = [];
    }
}

/**
 * 清除聊天历史
 */
function clearChatHistory() {
    if (confirm('确定要清除所有聊天记录吗？')) {
        chatHistory = [];
        localStorage.removeItem('chat_history');

        // 清空聊天窗口（保留欢迎消息）
        const messagesContainer = document.getElementById('chatMessages');
        const welcomeMessage = messagesContainer.querySelector('.message');
        messagesContainer.innerHTML = '';
        if (welcomeMessage) {
            messagesContainer.appendChild(welcomeMessage.cloneNode(true));
        }
    }
}

// 添加一些实用的快捷功能
const quickActions = {
    /**
     * 推荐工具
     */
    recommendTool: function(purpose) {
        const input = document.getElementById('chatInput');
        input.value = `我想${purpose}，请推荐合适的AI工具。`;
        sendMessage();
    },

    /**
     * 询问使用方法
     */
    askHowToUse: function(toolName) {
        const input = document.getElementById('chatInput');
        input.value = `请介绍${toolName}的使用方法和主要功能。`;
        sendMessage();
    },

    /**
     * 比较工具
     */
    compareTools: function(tool1, tool2) {
        const input = document.getElementById('chatInput');
        input.value = `请比较${tool1}和${tool2}，帮我选择更适合的工具。`;
        sendMessage();
    }
};

// 将快捷功能暴露到全局
window.quickActions = quickActions;

console.log('AI工具集成平台初始化完成 ✅');
console.log('DeepSeek智能助手已就绪 🤖');
