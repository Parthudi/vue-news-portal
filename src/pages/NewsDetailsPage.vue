<template>
  <div class="news-details-container">
    <button class="back-link" @click="goBack">← Back to News</button>

    <div v-if="!article" class="not-found-msg">
      <h2>Article not found</h2>
      <button class="back-link" @click="goBack">Return to list</button>
    </div>

    <div v-else class="article-wrapper">
      <div class="header-image-box">
        <img :src="article.image" :alt="article.title" class="article-image"/>
        <span class="category-tag">{{ article.keyword }}</span>
      </div>

      <div class="article-body-content">
        <span class="date-text">{{ new Date(article.date).toLocaleDateString() }}</span>

        <h1 class="main-title">{{ article.title }}</h1>

        <div class="divider-line"></div>

        <p class="main-description">{{ article.description }}</p>

        <div class="button-actions">
          <a :href="article.url" target="_blank" rel="noopener noreferrer" class="read-full-btn">
            Open Original Article
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useNewsStore } from '@/stores/newsStore';
import { defineComponent, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'NewsDetailsPage',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const newsStore = useNewsStore()

    const article = computed(() => {
      if (newsStore.selectedArticle?.id === route.params.id) {
        return newsStore.selectedArticle
      }
      return newsStore.articles.find(a => a.id === route.params.id) || null
    })

    const goBack = () => {
      router.push({ name: 'news-list' })
    }

    return {
      article,
      goBack,
    }
  }
})
</script>

<style scoped>
.news-details-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.back-link {
  background: none;
  border: none;
  font-size: 16px;
  color: #1976d2;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 0;
}

.back-link:hover {
  text-decoration: underline;
}

.not-found-msg {
  text-align: center;
  padding: 50px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.article-wrapper {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.header-image-box {
  position: relative;
  width: 100%;
  height: 350px;
  background-color: #eee;
}

.article-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-tag {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #1976d2;
  color: white;
  padding: 5px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  text-transform: capitalize;
}

.article-body-content {
  padding: 30px;
}

.date-text {
  font-size: 14px;
  color: #777;
  display: block;
  margin-bottom: 15px;
}

.main-title {
  font-size: 28px;
  color: #333;
  margin: 0 0 20px 0;
  line-height: 1.3;
}

.divider-line {
  height: 2px;
  width: 50px;
  background-color: #1976d2;
  margin-bottom: 20px;
}

.main-description {
  font-size: 18px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 30px;
}

.button-actions {
  display: flex;
  gap: 15px;
}

.read-full-btn {
  display: inline-block;
  background-color: #1976d2;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
}

.read-full-btn:hover {
  background-color: #1565c0;
}

.copy-link-btn {
  background-color: white;
  color: #1976d2;
  border: 1px solid #1976d2;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

.copy-link-btn:hover {
  background-color: #f0f7ff;
}
</style>
