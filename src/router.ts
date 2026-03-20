import { createRouter, createWebHistory } from 'vue-router'
import NewsListPage from '@/pages/NewsListPage.vue'
import NewsDetailsPage from '@/pages/NewsDetailsPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'news-list',
      component: NewsListPage,
    },
    {
      path: '/news/:id',
      name: 'news-details',
      component: NewsDetailsPage,
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router