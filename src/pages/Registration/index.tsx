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
        message: "Fill in the field",
      })
      return
    }

    const trimmedUsername = username.trim().replace(/\s+/g, "")
    const trimmedPassword = password.trim().replace(/\s+/g, "")

    if (trimmedUsername.length < 3) {
      setError({
        field: "username",
        message: "Fill in the field",
      })
      return
    }

    if (trimmedPassword.length < 3) {
      setError({
        field: "password",
        message: "Fill in the field",
      })
      return
    }

    if (!trimmedUsername) {
      setError({
        field: "username",
        message: "Username cannot contain spaces.",
      })
      return
    }

    if (!trimmedPassword) {
      setError({
        field: "password",
        message: "The password cannot contain spaces.",
      })
      return
    }

    const hasLetter = /[A-Za-z]/.test(trimmedPassword)
    const hasNumber = /[0-9]/.test(trimmedPassword)

    if (!hasLetter || !hasNumber) {
      setError({
        field: "password",
        message: "The password must contain at least one letter and one number.",
      })
      return
    }

    try {
      await UsersAPI.postUser({
        username: trimmedUsername,
        password: trimmedPassword,
        email: ''
      })
      setError({
        field: 'ok',
        message: 'You have successfully registered. Log in. Redirecting...',
      })

      setTimeout(() => {
        navigate('/login');
      }, 5000);

      setUsername("")
      setPassword("")
    } catch (err) {
      console.error("Error creating user:", err)
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