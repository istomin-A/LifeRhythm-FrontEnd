import style from './error.module.scss'
import type { ErrorType } from './error.type'

function Error({ children }: ErrorType) {
  return <div className={style.error}>{children}</div>
}

export default Error