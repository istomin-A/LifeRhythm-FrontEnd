import type { ButtonProps } from '../Button/button.types'
import style from './buttonActions.module.scss'

function ButtonActions({ children, className, ...props }: ButtonProps) {
  return (
    <button {...props} className={`${style.button} ${className || ''}`}>{children}</button>
  )
}

export default ButtonActions