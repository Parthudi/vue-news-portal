import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { NewsArticle } from '@/types/news'
import { fetchNewsArticles } from '@/services/newsService'

const PAGE_SIZE = 10

export type { NewsArticle }

export const useNewsStore = defineStore('news', () => {
  const articles = ref<NewsArticle[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const searchKeyword = ref('technology')
  const selectedArticle = ref<NewsArticle | null>(null)

  const filteredNews = computed(() => {
    const kw = searchKeyword.value.trim().toLowerCase()
    if (!kw) return articles.value
    return articles.value.filter(
      (a) =>
        a.title.toLowerCase().includes(kw) ||
        a.description.toLowerCase().includes(kw),
    )
  })

  const totalPages = computed(() => Math.ceil(filteredNews.value.length / PAGE_SIZE))

  const paginatedNews = computed(() => {
    const start = (currentPage.value - 1) * PAGE_SIZE
    return filteredNews.value.slice(start, start + PAGE_SIZE)
  })

  async function fetchNews(keyword?: string) {
    const kw = keyword ?? searchKeyword.value
    loading.value = true
    error.value = null
    try {
      articles.value = await fetchNewsArticles(kw)
      currentPage.value = 1
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  function setSearchKeyword(keyword: string) {
    searchKeyword.value = keyword
    currentPage.value = 1
    fetchNews(keyword || 'technology')
  }

  function setCurrentPage(page: number) {
    currentPage.value = page
  }

  function selectArticle(article: NewsArticle) {
    selectedArticle.value = article
  }

  return {
    articles,
    loading,
    error,
    currentPage,
    searchKeyword,
    selectedArticle,
    filteredNews,
    totalPages,
    paginatedNews,
    fetchNews,
    setSearchKeyword,
    setCurrentPage,
    selectArticle,
  }
})
