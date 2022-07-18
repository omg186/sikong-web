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

import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK } = viteEnv
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    vue(),
    // have to
    vueJsx(),
    //svg
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',

      /**
       * 自定义插入位置
       * @default: body-last
       */
      inject: 'body-first',

      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      customDomId: '__svg__icons__dom__',
    }),
    // support name
    // vueSetupExtend(),
    legacy({
      targets: ['chrome 52'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      renderLegacyChunks: true,
      polyfills: [
        'es.symbol',
        'es.array.filter',
        'es.promise',
        'es.promise.finally',
        'es/map',
        'es/set',
        'es.array.for-each',
        'es.object.define-properties',
        'es.object.define-property',
        'es.object.get-own-property-descriptor',
        'es.object.get-own-property-descriptors',
        'es.object.keys',
        'es.object.to-string',
        'web.dom-collections.for-each',
        'esnext.global-this',
        'esnext.string.match-all',
      ],
    }),
    VitePluginCertificate({
      source: 'coding',
    }),
  ]

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))
  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))

  // vite-plugin-windicss
  vitePlugins.push(windiCSS())
  // vitePlugins.push(Unocss())
  if (isBuild) {
    vitePlugins.push(legacy())
  }
  return vitePlugins
}
