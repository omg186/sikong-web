import { PluginOption } from 'vite'

import vue from '@vitejs/plugin-vue'

// import Unocss from 'unocss/vite'
import windiCSS from 'vite-plugin-windicss'
// 使用它来提供对旧版本浏览器的支持
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'
// 使用 mkcert 为 vite https 开发服务提供证书支持
import VitePluginCertificate from 'vite-plugin-mkcert'
import { configMockPlugin } from './mock'
import { ViteEnv } from '/#/global'
import { configHtmlPlugin } from './html'

import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import { configSvgIconsPlugin } from './svgSprite'
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK, VITE_LEGACY } = viteEnv
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    vue(),
    // have to
    vueJsx(),
    vueSetupExtend(),
    VitePluginCertificate({
      source: 'coding',
    }),
  ]

  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(legacy())
  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild))
  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))

  // vite-plugin-windicss
  vitePlugins.push(windiCSS())
  // vitePlugins.push(Unocss())
  if (isBuild) {
    // vitePlugins.push(legacy())
  }
  return vitePlugins
}
