import { generateAntColors, primaryColor } from '../config/themeConfig'
import { getThemeVariables } from 'ant-design-vue/dist/theme'
import { resolve } from 'path'

/**
 * less global variable
 */
export function generateModifyVars(dark = false) {
  const palettes = generateAntColors(primaryColor)
  const primary = primaryColor

  const primaryColorObj: Record<string, string> = {}

  for (let index = 0; index < 10; index++) {
    primaryColorObj[`primary-${index + 1}`] = palettes[index]
  }

  const modifyVars = getThemeVariables({ dark })
  return {
    ...modifyVars,
    // Used for global import to avoid the need to import each style file separately
    // reference:  Avoid repeated references
    hack: `${modifyVars.hack} @import (reference) "${resolve(
      'src/design/config.less'
    )}";`,
    'primary-color': primary,
    ...primaryColorObj,
    'info-color': primary,
    'processing-color': primary,
    'success-color': '#55D187', //  Success color
    'error-color': '#ED6F6F', //  False color
    'warning-color': '#EFBD47', //   Warning color
    //'border-color-base': '#EEEEEE',
    'font-size-base': '16px', //  Main font size
    'border-radius-base': '8px', //  Component/float fillet
    '@border-color-base': '#DBDFDD',
    'link-color': 'rgba(131, 134, 126, 1)', //   Link color
    'app-content-background': '#fafafa', //   Link color
    '@font-size-base': '14px', //主字号
    '@input-height-base': '36px',
    // '@line-height-base': '40px',//行高
  }
}
