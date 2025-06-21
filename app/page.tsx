"use client";

import { useState } from "react";
import Image from "next/image";

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
): Promise<FoodImageResult[]> {
  const url = new URL("https://api.spoonacular.com/recipes/complexSearch");
  url.searchParams.set("apiKey", apiKey);
  url.searchParams.set("query", query);
  url.searchParams.set("number", maxResults.toString());
  url.searchParams.set("addRecipeInformation", "true");

  const response = await fetch(url.toString());
  const data = await response.json();

  return (data.results || []).map((item: any) => ({
    id: item.id,
    title: item.title,
    image: item.image || "",
    readyInMinutes: item.readyInMinutes,
    servings: item.servings,
  }));
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [results, setResults] = useState<FoodImageResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim() || !apiKey.trim()) {
      setError("请输入菜品名称和 API 密钥");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const searchResults = await searchFoodImages(query, apiKey, 5);
      setResults(searchResults);
    } catch (err) {
      setError("搜索失败，请检查 API 密钥和网络连接");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          🍽️ 菜品图片搜索 API 测试
        </h1>

        {/* API 测试窗口框 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            API 测试面板
          </h2>

          <div className="space-y-4">
            {/* API 密钥输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Spoonacular API 密钥
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="输入你的 API 密钥"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* 搜索查询输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                菜品名称
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="例如：宫保鸡丁、红烧肉、麻婆豆腐"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* 搜索按钮 */}
            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              {loading ? "搜索中..." : "🔍 搜索菜品图片"}
            </button>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* 搜索结果 */}
        {results.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              搜索结果 ({results.length} 个菜品)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-square mb-3 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <h4 className="font-semibold text-gray-800 dark:text-white text-sm mb-2 line-clamp-2">
                    {item.title}
                  </h4>

                  <div className="flex gap-2 text-xs text-gray-600 dark:text-gray-400">
                    {item.readyInMinutes && (
                      <span>⏱️ {item.readyInMinutes}分钟</span>
                    )}
                    {item.servings && <span>👥 {item.servings}人份</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 使用说明 */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
            📝 使用说明
          </h3>
          <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
            <li>
              • 首先需要在{" "}
              <a
                href="https://spoonacular.com/food-api"
                target="_blank"
                rel="noopener"
                className="underline hover:text-blue-900 dark:hover:text-blue-200"
              >
                Spoonacular
              </a>{" "}
              注册获取免费 API 密钥
            </li>
            <li>• 免费账户每天有 150 次 API 调用限制</li>
            <li>• 支持中英文菜品名称搜索</li>
            <li>• 搜索结果包含图片、标题、烹饪时间和份量信息</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
