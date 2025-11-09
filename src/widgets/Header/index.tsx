import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FormSearch from '@/shared/ui/FormSearch'
import Button from '@/shared/ui/Button'
import Burger from '@/shared/ui/Burger'
import ButtonActions from '@/shared/ui/ButtonActions'
import CreateIcon from '@/shared/images/create.svg?react'
import Logo from '@/shared/ui/Logo'
import { UsersAPI, SearchAPI } from "@/store";
import type { TokenInfo } from '@/processes/auth/AuthWrapper/AuthWrapper.type'
import type { ResultSearchType, ResultSearchResultType } from '@/store/search/query/type'
import ResultSearchModal from '@/shared/ui/FormSearch/components/ResultSearchModal'

import { menuItems } from './constants'
import type { MenuItem } from './header.type'
import style from './header.module.scss'

function Header() {
  const [open, setOpen] = useState<boolean>(false)
  const [infoToken, setInfoToken] = useState<TokenInfo>({});
  const [loading, setLoading] = useState<boolean>(true)
  const [resultSearch, setResultSearch] = useState<ResultSearchType | null>(null)
  const [error, setError] = useState<{ field: string, message: string }>({ field: '', message: '' })
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [selectedGoal, setSelectedGoal] = useState<ResultSearchResultType[] | undefined>();
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

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    UsersAPI.verify(token ?? '')
      .then((token) => setInfoToken(token))
      .catch(error => {
        console.error('Verification failed:', error);
      })
  }, [navigate, sessionStorage.getItem("token")])

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

  const openModal = (goal: ResultSearchResultType[]) => {
    setSelectedGoal(goal)
    setIsOpenModal(true)
  }

  const search = async (e: React.FormEvent<HTMLFormElement>, searchWord: string) => {
    e.preventDefault()

    const userId = infoToken.user?.user_id;
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const data = await SearchAPI.getGoalSearch(userId, searchWord);
      setResultSearch(data);
      openModal(data.results)
    } catch (err: any) {
      console.error("Failed to load data:", err);
      setError({ field: "getUser", message: "Failed to load user" });
    } finally {
      setLoading(false);
    }
  }

  console.log('loading', loading)
  console.log('error', error)

  const isErrorSearch = selectedGoal

  console.log('isErrorSearch', isErrorSearch)

  return (
    <>
      <header className={style.header}>
        <div className={`${style.wrapper} _container`}>
          <Logo />

          <div className={`${style.inner} ${style.innerMobButton}`}>
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

          <div className={open ? `${style.burgerWrapper} ${style._active}` : style.burgerWrapper}>
            <FormSearch
              search={search}
              isErrorSearch={isErrorSearch}
            />

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

      {isOpenModal && selectedGoal &&
        <ResultSearchModal
          data={resultSearch?.results}
          isOpen={true}
          setIsOpenModal={setIsOpenModal}
        />
      }
    </>
  )
}

export default Header