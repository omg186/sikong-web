export const createBtn = ({ addComponents, theme }) => {
  const linear: string = theme('colors.btn-linear-default') as string
  console.log(linear)
  const buttons = {
    // '.btn': {},
    // '.btn-linear': {
    //   background: linear,
    //   'box-shadow': '0px 8px 10px 1px rgba(5, 251, 126, 0.2000)',
    //   border: '4px solid #DDFFF0',
    //   color: '#fffff',
    //   '&:hover,&:focus': {
    //     color: '#fff',
    //     background: 'linear-gradient(90deg, #2DFC91 0%, #4AE4A9 100%)',
    //   },
    //   '&:active': {
    //     background: linear,
    //   },
    // },
  }
  addComponents(buttons)
}
