import { createApp } from 'vue'
import App from '@/App.vue'
// import 'uno.css'
import 'virtual:windi-base.css'
import '@/style/index.less'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import 'virtual:windi-devtools'

import 'virtual:svg-icons-register' //这一句必须要加上
import router from './routers'
import { setupStore } from './store'

import { registerGlobComp } from '@/components/registerGlobComp'
const app = createApp(App)
// main.ts
import { setGlobalOptions } from 'vue-request'
import { setupRouterGuard } from './routers/guard'
import { initAppConfigStore } from './logics/initAppConfig'

import echarts from './utils/echarts'

import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
dayjs.locale(zhCN.locale)
// ...
setGlobalOptions({
  manual: true,
  // ...
})
app.config.globalProperties.$echarts = echarts
app.use(router)

setupStore(app)

// 初始化内部系统配置
initAppConfigStore()
// 路由守卫
setupRouterGuard(router)
registerGlobComp(app)
app.mount('#app')

// app.use(Antd)
