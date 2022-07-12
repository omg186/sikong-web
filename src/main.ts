import { createApp } from 'vue'
import App from '@/App.vue'
// import 'uno.css'
import 'virtual:windi-base.css'
import '@/style/index.less'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import 'virtual:windi-devtools'

import router from './routers'
import { setupStore } from './store'

import { registerGlobComp } from '@/components/registerGlobComp'
const app = createApp(App)

app.use(router)
setupStore(app)
registerGlobComp(app)
app.mount('#app')

// app.use(Antd)
