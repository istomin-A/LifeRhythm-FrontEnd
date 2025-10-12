import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FormSearch from '@/shared/ui/FormSearch'
import Button from '@/shared/ui/Button'
import Burger from '@/shared/ui/Burger'
import ButtonActions from '@/shared/ui/ButtonActions'
import CreateIcon from '@/shared/images/create.svg?react'
import Logo from '@/shared/ui/Logo'

import type { MenuItem } from './header.type'
import style from './header.module.scss'

const menuItems: MenuItem[] = [
  {
    label: "Регистрация",
    path: "/registration",
    link: "",
  },
  {
    label: "Войти",
    path: "/login",
    link: "",
  }
]

function Header() {
  const [open, setOpen] = useState<boolean>(false)
  const navigate = useNavigate();

  const handleNavigation = (path: string) => navigate(path);

  const token = sessionStorage.getItem("token")

  useEffect(() => {
    if (open) {
      document.body.classList.add('_lock');
    } else {
      document.body.classList.remove('_lock');
    }

    return () => document.body.classList.remove('_lock');
  }, [open])

  const handleClick = (item: MenuItem) => {
    if (item.path) {
      // Якщо є path, то викликаємо навігацію в межах додатку
      handleNavigation(item.path);
    } else if (item.link) {
      // Якщо є link, то викликаємо перенаправлення через window.location.href
      window.location.href = item.link;
    }
  }

  const logout = () => {
    sessionStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <header className={style.header}>
      <div className={`${style.wrapper} _container`}>
        <Logo />

        <div className={`${style.inner} ${style.innerMobButton}`}>
          {!token ? (
            menuItems.map((item) => {
              return (
                <Button
                  link={item.path}
                  onClick={() => handleClick(item)}
                  key={item.label}
                >{item.label}</Button>
              )
            })
          ) : <Button onClick={logout}>Выйти</Button>}
        </div>

        <div className={open ? `${style.burgerWrapper} ${style._active}` : style.burgerWrapper}>
          <FormSearch />

          <div className={open ? `${style.inner} ${style._active}` : style.inner}>
            <div className={open ? `${style.inner} ${style._activeActions}` : style.inner}>
              <ButtonActions title="Создать задачу" type='button'>
                <CreateIcon className={style.buttonIcon} />
                {open && (<div>Создать задачу</div>)}
              </ButtonActions>
              <ButtonActions title="Создать задачу" type='button'>
                <CreateIcon className={style.buttonIcon} />
                {open && (<div>Создать задачу</div>)}
              </ButtonActions>
              <ButtonActions title="Создать задачу" type='button'>
                <CreateIcon className={style.buttonIcon} />
                {open && (<div>Создать задачу</div>)}
              </ButtonActions>
            </div>

            <div className={open ? `${style.inner} ${style._activeButtons}` : style.inner}>
              {!token ? (
                menuItems.map((item) => {
                  return (
                    <Button
                      link={item.path}
                      onClick={() => handleClick(item)}
                      key={item.label}
                    >{item.label}</Button>
                  )
                })
              ) : <Button onClick={logout}>Выйти</Button>}
            </div>
          </div>
        </div>

        <Burger openBurger={open} openSet={setOpen} />
      </div>
    </header>
  )
}

export default Header