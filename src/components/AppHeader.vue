<template>
  <header class="app-top-header">
    <div class="header-container">
      <div class="logo-area" @click="goToHomePage">
        <h2 class="app-title">News Portal</h2>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'AppHeader',
  setup() {
    const router = useRouter()

    const goToHomePage = () => {
      router.push({ name: 'news-list' })
    }

    return { goToHomePage }
  }
})
</script>

<style scoped>
.app-top-header {
  background-color: #1976d2;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 15px 0;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-area {
  cursor: pointer;
}

.app-title {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}
</style>
