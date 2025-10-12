import Button from '@/shared/ui/Button'
import type { BurgerType } from './burger.type'
import style from './burger.module.scss'

function Burger({ openBurger, openSet }: BurgerType) {
  const handleClick = () => openSet?.(!openBurger)

  return (
    <div className={style.wrapper}>
      <Button onClick={handleClick}>
        <div className={openBurger ? `${style.burger} ${style._active}` : style.burger}>
          <span className={style.line}></span>
          <span className={style.line}></span>
          <span className={style.line}></span>
        </div>
      </Button>
    </div>
  )
}

export default Burger