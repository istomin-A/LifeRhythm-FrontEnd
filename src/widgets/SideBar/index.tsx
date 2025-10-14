import { useNavigate } from "react-router-dom";
import Button from '@/shared/ui/Button'
import HomeIcon from '@/shared/images/home.svg?react'
import type { MenuItem } from '@/widgets/Header/header.type'
import style from './sidebar.module.scss'

function SideBar() {
  const navigate = useNavigate();
  const handleNavigation = (path: string) => navigate(path);

  const handleClick = (item: MenuItem) => {
    if (item.path) {
      // Якщо є path, то викликаємо навігацію в межах додатку
      handleNavigation(item.path);
    } else if (item.link) {
      // Якщо є link, то викликаємо перенаправлення через window.location.href
      window.location.href = item.link;
    }
  }

  const menuItems: MenuItem[] = [
    {
      label: "home",
      path: "",
      link: "",
    },
    {
      label: "task",
      path: "",
      link: "",
    },
    {
      label: "task1",
      path: "",
      link: "",
    }
  ]

  return (
    <aside className={style.aside}>
      <div className={style.wrapper}>
        {menuItems.map((item) => {
          return (
            <Button
              link={item.path}
              onClick={() => handleClick(item)}
              key={item.label}
            >
              <span className={style.inner}>
                <HomeIcon className={style.icon} />
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