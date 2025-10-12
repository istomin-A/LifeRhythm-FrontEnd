import type { ButtonProps } from '../Button/button.types'
import style from './buttonActions.module.scss'

function ButtonActions({ children, ...props }: ButtonProps) {
  return (
    <button {...props} className={style.button}>{children}</button>
  )
}

export default ButtonActions