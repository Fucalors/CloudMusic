import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/main.css'
import 'remixicon/fonts/remixicon.css'

// import Loading from "@/components/Loading/index.js";




import piniaPluginPersist from 'pinia-plugin-persist'// pinia数据持久化插件

const store = createPinia() // 调用pinia
store.use(piniaPluginPersist)// 使用pinia数据持久化插件

const app = createApp(App)

app.config.errorHandler = function (err, instance, info) { //用于为应用内抛出的未捕获错误指定一个全局处理函数。
    // Handle the error here
    console.error('出现错误:', err);
    console.error('错误信息:', info);
};

app.use(store) //使用pinia

app.use(router)

// app.use(Loading)

app.mount('#app')