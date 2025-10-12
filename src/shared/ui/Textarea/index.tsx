import style from './textarea.module.scss'
import type { TextareaProps } from './textarea.type'

function Textarea({ placeholder, ...props }: TextareaProps) {
  return (
    <textarea
      className={style.textarea}
      placeholder={placeholder}
      {...props}></textarea>
  )
}

export default Textarea