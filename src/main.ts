import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'

import App from './App.vue'
import router from './router/index'

const app = createApp(App).use(router).use(ElementPlus).use(createPinia)


app.mount('#app')
