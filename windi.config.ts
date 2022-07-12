import { defineConfig } from 'vite-plugin-windicss'
import { primaryColor } from './build/config/themeConfig'

import plugin from 'windicss/plugin'
import { createBtn } from './build/windi/button'
export default defineConfig({
  darkMode: 'class',
  prefixer: false, // 是否需要自动兼容平台浏览器（不需要）
  prefix: '', // 类名样式前缀（防止样式污染）
  preflight: true,
  attributify: { prefix: 's' },
  extract: {
    // 扫描文件范围
    include: ['src/**/*.{css,html,vue,tsx}'],
    // 忽略扫描文件夹
    exclude: ['node_modules', '.git', 'dist'],
  },
  plugins: [
    createEnterPlugin(),
    plugin(createBtn),
    require('windicss/plugin/forms'),
    require('windicss/plugin/aspect-ratio'),
  ],
  theme: {
    extend: {
      zIndex: {
        '-1': '-1',
      },
      colors: {
        primary: primaryColor,
      },
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1600px',
        '3xl': '1920px',
      },
    },
  },
  shortcuts: {
    // btn: {
    //   color: 'white',
    //   '@apply': 'py-2 px-4 font-semi rounded-lg',
    //   '&:hover': {
    //     '@apply': 'bg-green-700',
    //     color: 'black',
    //   },
    // },
    'btn-green': 'text-white bg-green-500 hover:bg-green-700',
  },
})

/**
 * Used for animation when the element is displayed.
 * @param maxOutput The larger the maxOutput output, the larger the generated css volume.
 */
function createEnterPlugin(maxOutput = 6) {
  const createCss = (index: number, d = 'x') => {
    const upd = d.toUpperCase()
    return {
      [`*> .enter-${d}:nth-child(${index})`]: {
        transform: `translate${upd}(50px)`,
      },
      [`*> .-enter-${d}:nth-child(${index})`]: {
        transform: `translate${upd}(-50px)`,
      },
      [`* > .enter-${d}:nth-child(${index}),* > .-enter-${d}:nth-child(${index})`]:
        {
          'z-index': `${10 - index}`,
          opacity: '0',
          animation: `enter-${d}-animation 0.4s ease-in-out 0.3s`,
          'animation-fill-mode': 'forwards',
          'animation-delay': `${(index * 1) / 10}s`,
        },
    }
  }
  const handler = ({ addBase }) => {
    const addRawCss = {}
    for (let index = 1; index < maxOutput; index++) {
      Object.assign(addRawCss, {
        ...createCss(index, 'x'),
        ...createCss(index, 'y'),
      })
    }
    addBase({
      ...addRawCss,
      [`@keyframes enter-x-animation`]: {
        to: {
          opacity: '1',
          transform: 'translateX(0)',
        },
      },
      [`@keyframes enter-y-animation`]: {
        to: {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
    })
  }
  return { handler }
}
