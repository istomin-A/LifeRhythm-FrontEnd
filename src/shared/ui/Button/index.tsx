import type { ButtonProps } from './button.types'
import style from './button.module.scss'

function Button({ link, children, ...props }: ButtonProps) {
  if (link) {
    const anchorProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={link} {...anchorProps} className={style.button}>{children}</a>
    )
  }

  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button {...buttonProps} className={style.button}>{children}</button>
  )
}

export default Button