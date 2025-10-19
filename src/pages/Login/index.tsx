import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UsersAPI } from "@/store";

import FormMain from '@/shared/ui/FormMain'
import style from './login.module.scss'

function Login() {
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

    try {
      const login = await UsersAPI.LoginUsers({
        username: username,
        password: password
      })

      const token = login.token;

      if (!token) {
        console.error("Failed to obtain token");
        return;
      }

      sessionStorage.setItem("token", token);

      setError({
        field: "ok",
        message: "Login successful! Redirecting..."
      });

      setTimeout(() => {
        navigate("/", { relative: "route" });
      }, 5000);
    } catch (err) {
      setError({
        field: "error",
        message: "Incorrect username or password"
      });
      console.error("Login error:", err)
    }
  };

  return (
    <div className={`${style.wrapper} _container`}>
      <div className={style.inner}>
        <h1 className='_h1'>Login</h1>
        {error?.field === 'ok'
          ? <div className='_susses'>{error.message}</div>
          : null}
        {error?.field === 'error'
          ? <div className={`${style.error} _susses`}>{error.message}</div>
          : null}
        <FormMain
          username={username}
          password={password}
          error={error}
          setUsername={setUsername}
          setPassword={setPassword}
          handleAddUser={handleAddUser}
          labelUserName={'Enter your username'}
          labelPassword={'Enter your password'} />
      </div>
    </div>
  )
}

export default Login