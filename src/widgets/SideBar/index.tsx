import { useNavigate } from "react-router-dom";
import Button from '@/shared/ui/Button'

import { menuItems } from './constants'
import type { MenuItem } from '@/widgets/Header/header.type'
import style from './sidebar.module.scss'

function SideBar() {
  const navigate = useNavigate();
  const handleNavigation = (path: string) => navigate(path);

  const handleClick = (item: MenuItem) => {
    if (item.path) {
      handleNavigation(item.path);
    } else if (item.link) {
      window.location.href = item.link;
    }
  }

  return (
    <aside className={style.aside}>
      <div className={style.wrapper}>
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              link={item.path}
              onClick={() => handleClick(item)}
              key={item.label}
            >
              <span className={style.inner}>
                {Icon && <Icon className={style.icon} />}
                <span className={style.label}>{item.label}</span>
              </span>
            </Button>
          )
        })}
      </div>
    </aside>
  )
}

export default SideBar