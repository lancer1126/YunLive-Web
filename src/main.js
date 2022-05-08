import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '../public/iconfont/iconfont.css'
import * as ElementPlusIcons from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, comp] of Object.entries(ElementPlusIcons)) {
    app.component(key, comp)
}

app.use(router)
app.use(ElementPlus)

app.config.globalProperties.$http = axios

app.mount('#app')
