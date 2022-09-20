import type { App } from 'vue'
// import { Button } from './Button'
import { Input, Button } from 'ant-design-vue'

import SvgIcon from './SvgIcon.vue'
import ImgIcon from './ImgIcon.vue'
export function registerGlobComp(app: App) {
  app.component('SvgIcon', SvgIcon)
  app.component('ImgIcon', ImgIcon)
}
