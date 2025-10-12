import style from './input.module.scss'
import type { InputType } from './input.type'

function Input({ search, ...props }: InputType) {
  return (
    <input
      className={search ? style.inputSearch : style.input}
      {...props}
    />
  )
}

export default Input