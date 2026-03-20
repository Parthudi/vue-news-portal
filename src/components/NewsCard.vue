<template>
  <div class="news-card" @click="$emit('click')">
    <div class="image-container">
      <img :src="article.image" :alt="article.title" />
      <span class="keyword-badge">{{ article.keyword }}</span>
    </div>

    <div class="card-content">
      <p class="published-date">
        {{ new Date(article.date).toLocaleDateString() }}
      </p>
      <h3 class="title">{{ article.title }}</h3>
      <p class="description">{{ article.description }}</p>
      <button class="read-more-btn">Read more</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { NewsArticle } from '@/stores/newsStore'

export default defineComponent({
  name: 'NewsCard',
  props: {
    article: {
      type: Object as PropType<NewsArticle>,
      required: true,
    },
  },
  emits: ['click'],
  setup() {},
})
</script>

<style scoped>
.news-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background-color: #fff;
  transition: box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.news-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.image-container {
  position: relative;
  height: 200px;
  width: 100%;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.keyword-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #1976d2;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.card-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.published-date {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.title {
  font-size: 16px;
  color: #333;
  margin: 0 0 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.description {
  font-size: 14px;
  color: #555;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.read-more-btn {
  background: none;
  border: none;
  color: #1976d2;
  font-weight: bold;
  padding: 0;
  cursor: pointer;
  text-align: left;
}

.read-more-btn:hover {
  text-decoration: underline;
}
</style>
