import { createApp } from 'vue'
import App from '@/App.vue'
// import 'uno.css'
import 'virtual:windi-base.css'
import '@/style/index.less'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import 'virtual:windi-devtools'

// import 'virtual:svg-icons-register' //这一句必须要加上
import router from './routers'
import { setupStore } from './store'

import { registerGlobComp } from '@/components/registerGlobComp'
const app = createApp(App)
// main.ts
import { setGlobalOptions } from 'vue-request'
import { setupRouterGuard } from './routers/guard'
// import '@/assets/iconfont.js'
// ...
setGlobalOptions({
  manual: true,
  // ...
})
app.use(router)

setupStore(app)
// 路由守卫
setupRouterGuard(router)
registerGlobComp(app)
app.mount('#app')

// app.use(Antd)
