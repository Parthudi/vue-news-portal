import type { NewsArticle } from '@/types/news'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY || ''
const BASE_URL = 'https://newsapi.org/v2'

interface NewsAPIArticle {
  title: string
  description: string
  urlToImage: string
  publishedAt: string
  url: string
}

interface NewsAPIResponse {
  status: string
  articles: NewsAPIArticle[]
  message?: string
}

export async function fetchNewsArticles(keyword: string = 'tesla'): Promise<NewsArticle[]> {
  const url = `${BASE_URL}/everything?q=${encodeURIComponent(keyword)}&pageSize=100&sortBy=publishedAt&language=en&apiKey=${API_KEY}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`)
  }

  const data: NewsAPIResponse = await response.json()

  if (data.status !== 'ok') {
    throw new Error(data.message || 'Failed to fetch news')
  }

  return data.articles
    .filter((a) => a.title && a.title !== '[Removed]' && a.description && a.urlToImage)
    .map((article, index) => ({
      id: `${keyword}-${index}-${Date.now()}`,
      title: article.title,
      description: article.description || '',
      image: article.urlToImage,
      date: article.publishedAt,
      url: article.url,
      keyword,
    }))
}
