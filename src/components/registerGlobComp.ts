import type { App } from 'vue'
// import { Button } from './Button'
import { Input, Button } from 'ant-design-vue'

import SvgIcon from './SvgIcon.vue'
export function registerGlobComp(app: App) {
  app.component('SvgIcon', SvgIcon)
}
