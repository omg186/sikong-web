import { createApp } from 'vue'
import App from '@/App.vue'
import 'virtual:windi.css'
import 'virtual:windi-devtools'
import '@/style/index.less'
import router from './routers'
const app = createApp(App)

app.use(router)

app.mount('#app')
