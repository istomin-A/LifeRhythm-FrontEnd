import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UsersAPI } from "@/store";

import FormMain from '@/shared/ui/FormMain'
import style from './registration.module.scss'

function Registration() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<{ field: string; message: string }>({
    field: "",
    message: "",
  });

  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!username || !password) {
      setError({
        field: !username ? "username" : "password",
        message: "Заполните поле",
      })
      return
    }

    const trimmedUsername = username.trim().replace(/\s+/g, "")
    const trimmedPassword = password.trim().replace(/\s+/g, "")

    if (trimmedUsername.length < 3) {
      setError({
        field: "username",
        message: "Заполните поле",
      })
      return
    }

    if (trimmedPassword.length < 3) {
      setError({
        field: "password",
        message: "Заполните поле",
      })
      return
    }

    if (!trimmedUsername) {
      setError({
        field: "username",
        message: "Имя пользователя не может состоять из пробелов",
      })
      return
    }

    if (!trimmedPassword) {
      setError({
        field: "password",
        message: "Пароль не может состоять из пробелов",
      })
      return
    }

    const hasLetter = /[A-Za-z]/.test(trimmedPassword)
    const hasNumber = /[0-9]/.test(trimmedPassword)

    if (!hasLetter || !hasNumber) {
      setError({
        field: "password",
        message: "Пароль должен содержать хотя бы одну букву и одну цифру",
      })
      return
    }

    try {
      await UsersAPI.postUser({
        username: trimmedUsername,
        password: trimmedPassword
      })
      setError({
        field: 'ok',
        message: 'Вы успешно зарегестрировались. Войдите. Перенаправление...',
      })

      setTimeout(() => {
        navigate('/login');
      }, 5000);

      setUsername("")
      setPassword("")
    } catch (err) {
      console.error("Ошибка при создании пользователя:", err)
    }
  };

  return (
    <div className={`${style.wrapper} _container`}>
      <div className={style.inner}>
        <h1 className='_h1'>Registration</h1>
        {error?.field === 'ok'
          ? <div className='_susses'>{error.message}</div>
          : null}
        <FormMain
          error={error}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
          handleAddUser={handleAddUser}
          labelUserName={'Enter your username'}
          labelPassword={'Enter your password'}
        />
      </div>
    </div>
  )
}

export default Registration