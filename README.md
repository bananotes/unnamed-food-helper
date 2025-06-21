# Unnamed Food Helper

## Getting Started

First, install all packages using **PNPM**

```bash
pnpm i
```

First, run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# 菜品图片搜索 API 测试

这是一个简单的菜品图片搜索 API 测试工具，使用 Spoonacular Food API 来搜索和显示菜品图片。

## 功能特性

- 🔍 **菜品图片搜索** - 输入菜品名称，获取相关图片
- 📱 **响应式设计** - 适配不同屏幕尺寸

## 快速开始

### 1. 获取 API 密钥

1. 访问 [Spoonacular Food API](https://spoonacular.com/food-api)
2. 注册免费账户
3. 获取 API 密钥（免费账户每天有 150 次调用限制）

### 2. 运行项目

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 3. 使用测试工具

1. 打开浏览器访问 `http://localhost:3000`
2. 在 "Spoonacular API 密钥" 输入框中输入你的 API 密钥
3. 在 "菜品名称" 输入框中输入要搜索的菜品（如：宫保鸡丁、红烧肉等）
4. 点击 "搜索菜品图片" 按钮
5. 查看搜索结果

## 技术栈

- **框架**: Next.js 15 + React 19
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **API**: Spoonacular Food API

## 项目结构

```
app/
├── page.tsx              # 主页面（包含 API 测试界面）
├── globals.css           # 全局样式
└── layout.tsx            # 布局组件
```

## API 接口

### 搜索菜品图片

```typescript
interface FoodImageResult {
  id: number;
  title: string;
  image: string;
  readyInMinutes?: number;
  servings?: number;
}

async function searchFoodImages(
  query: string,
  apiKey: string,
  maxResults: number = 10
): Promise<FoodImageResult[]>;
```

### 使用示例

```typescript
const results = await searchFoodImages("宫保鸡丁", "your-api-key", 5);
console.log(results);
// 输出: [{ id: 1, title: "宫保鸡丁", image: "https://...", readyInMinutes: 30, servings: 4 }, ...]
```

## 环境变量

创建 `.env.local` 文件（可选）：

```env
NEXT_PUBLIC_SPOONACULAR_API_KEY=your-api-key-here
```

## 注意事项

- 免费 API 账户每天有 150 次调用限制
- 支持中英文菜品名称搜索
- 搜索结果包含图片、标题、烹饪时间和份量信息
- 建议在生产环境中将 API 密钥存储在服务器端

## 许可证

MIT License
