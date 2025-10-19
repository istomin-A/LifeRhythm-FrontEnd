import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FormSearch from '@/shared/ui/FormSearch'
import Button from '@/shared/ui/Button'
import Burger from '@/shared/ui/Burger'
import ButtonActions from '@/shared/ui/ButtonActions'
import CreateIcon from '@/shared/images/create.svg?react'
import Logo from '@/shared/ui/Logo'

import { menuItems } from './constants'
import type { MenuItem } from './header.type'
import style from './header.module.scss'

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
      handleNavigation(item.path);
    } else if (item.link) {
      window.location.href = item.link;
    }
  }

  const logout = () => {
    sessionStorage.removeItem('token')
    navigate('/login')
  }

  const loginDashboard = (
    <>
      {
        menuItems.map((item) => (
          item.close && token ?
            <Button
              link={item.path}
              onClick={() => handleClick(item)}
              key={item.label}
            >{item.icon ? <item.icon className={style.icon} /> : item.label}</Button>
            : null
        ))
      }
      <Button onClick={logout}>Log out</Button>
    </>
  )

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
          ) : <Button onClick={logout}>Log out</Button>}
        </div>

        <div className={open ? `${style.burgerWrapper} ${style._active}` : style.burgerWrapper}>
          <FormSearch />

          <div className={open ? `${style.inner} ${style._active}` : style.inner}>
            <div className={open ? `${style.inner} ${style._activeActions}` : style.inner}>
              <ButtonActions title="Create a task" type='button'>
                <CreateIcon className={style.buttonIcon} />
                {open && (<div>Create a task</div>)}
              </ButtonActions>
              <ButtonActions title="Create a task" type='button'>
                <CreateIcon className={style.buttonIcon} />
                {open && (<div>Create a task</div>)}
              </ButtonActions>
              <ButtonActions title="Create a task" type='button'>
                <CreateIcon className={style.buttonIcon} />
                {open && (<div>Create a task</div>)}
              </ButtonActions>
            </div>

            <div className={open ? `${style.inner} ${style._activeButtons}` : style.inner}>
              {!token ? (
                menuItems.map((item) => (
                  !token && !item.close ?
                    <Button
                      link={item.path}
                      onClick={() => handleClick(item)}
                      key={item.label}
                    >{item.label}</Button>
                    : null
                ))
              ) : loginDashboard}
            </div>
          </div>
        </div>

        <Burger openBurger={open} openSet={setOpen} />
      </div>
    </header>
  )
}

export default Header