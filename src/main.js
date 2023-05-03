import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/main.css'

import 'remixicon/fonts/remixicon.css'
import Loading from "@/components/Loading/index.js";


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Loading)

app.mount('#app')
