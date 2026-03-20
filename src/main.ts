import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import '@/styles/main.scss'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Quasar, {
  plugins: { Notify },
  config: {
    dark: true,
    brand: {
      primary: '#6366f1',
      secondary: '#06b6d4',
      accent: '#9fa8da',
      dark: '#0f0f1a',
      positive: '#10b981',
      negative: '#f43f5e',
      info: '#38bdf8',
      warning: '#f59e0b',
    },
  },
})

app.mount('#app')
