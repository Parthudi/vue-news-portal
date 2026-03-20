<template>
  <div class="news-list-container">
    <div class="header-section">
      <p>Total Articles: {{ newsStore.filteredNews.length }}</p>
    </div>

    <div class="search-section">
      <q-input
        v-model="searchInput"
        outlined
        placeholder="Enter keyword to search..."
        @keyup.enter="searchNews"
      >
        <template v-slot:append>
          <q-btn v-if="searchInput" flat icon="close" @click="clearSearch" />
        </template>
      </q-input>
      <q-btn color="primary" label="Search" @click="searchNews" style="margin-left: 10px;" />
    </div>

    <div v-if="newsStore.loading" class="status-message">
      Loading news...
    </div>

    <div v-else-if="newsStore.error" class="status-message">
      {{ newsStore.error }}
    </div>

    <div v-else-if="newsStore.filteredNews.length === 0" class="status-message">
      No articles found for "{{ newsStore.searchKeyword }}"
    </div>

    <div v-else class="articles-grid">
      <NewsCard
        v-for="article in newsStore.paginatedNews"
        :key="article.id"
        :article="article"
        @click="goToDetails(article)"
      />
    </div>

    <div v-if="newsStore.totalPages > 1 && !newsStore.loading" class="pagination-section">
      <q-pagination
        v-model="currentPage"
        :max="newsStore.totalPages"
        input
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNewsStore, type NewsArticle } from '@/stores/newsStore'
import NewsCard from '@/components/NewsCard.vue'

export default defineComponent({
  name: 'NewsListPage',
  components: { NewsCard },
  setup() {
    const newsStore = useNewsStore()
    const router = useRouter()
    
    const searchInput = ref(newsStore.searchKeyword)

    const currentPage = computed({
      get: () => newsStore.currentPage,
      set: (val: number) => {
        newsStore.setCurrentPage(val)
        window.scrollTo(0, 0)
      }
    })

    const searchNews = () => {
      const keyword = searchInput.value.trim()
      if (keyword) {
        newsStore.setSearchKeyword(keyword)
      }
    }

    const clearSearch = () => {
      searchInput.value = ''
      newsStore.setSearchKeyword('tesla')
    }

    const goToDetails = (article: NewsArticle) => {
      newsStore.selectArticle(article)
      router.push({ name: 'news-details', params: { id: article.id } })
    }

    onMounted(() => {
      if (newsStore.articles.length === 0) {
        newsStore.fetchNews('tesla')
      }
    })

    return {
      newsStore,
      searchInput,
      currentPage,
      searchNews,
      clearSearch,
      goToDetails
    }
  }
})
</script>

<style scoped>
.news-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header-section {
  margin-bottom: 20px;
}

.header-section h1 {
  margin: 0 0 10px 0;
  font-size: 32px;
  color: #333;
}

.header-section p {
  margin: 0;
  color: #666;
}

.search-section {
  display: flex;
  margin-bottom: 30px;
  align-items: stretch;
}

.search-section .q-input {
  flex-grow: 1;
  background: white;
}

/* Force text input color to dark so it's visible against white background */
.search-section :deep(.q-field__native),
.search-section :deep(.q-field__input) {
  color: #333 !important;
}

.status-message {
  text-align: center;
  padding: 50px;
  font-size: 18px;
  color: #666;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.pagination-section {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  padding: 20px;
}
</style>
