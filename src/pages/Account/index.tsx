import { useEffect, useState } from 'react'

import { UsersAPI } from '@/store'
import FormMain from '@/shared/ui/FormMain'
import Button from '@/shared/ui/Button'
import Loading from '@/shared/ui/Loading'
import Error from '@/shared/ui/Error'

import { fotmatedAt } from '@/pages/Home/utils'
import type { User } from '@/store/users/types'
import type { TokenProps } from '@/pages/Home/home.type'
import style from './account.module.scss'

function Account({ infoToken }: TokenProps) {
  const [email, setEmail] = useState<string>("")
  const [errorState, setErrorState] = useState<{ field: string; message: string }>({
    field: "",
    message: "",
  });
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [changeEmail, setChangeEmail] = useState<boolean>(false)

  useEffect(() => {
    const fetchUser = async () => {
      const userId = infoToken.user?.user_id;
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const data = await UsersAPI.getUser(userId);
        setUser(data);
      } catch (err: any) {
        console.error("Failed to load data:", err);
        setErrorState({ field: "getUser", message: "Failed to load user" });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [infoToken.user?.user_id]);

  if (loading) return <Loading />
  if (errorState.field === 'getUser') return <Error>{errorState.message}</Error>

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email.trim()) {
      setErrorState({
        field: "email",
        message: "Enter your email",
      })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorState({
        field: "email",
        message: "Invalid email format",
      });
      return;
    }

    if (email.length > 255) {
      setErrorState({
        field: "email",
        message: "Email is too long (max 255 characters)",
      });
      return;
    }

    const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];
    const domain = email.split("@")[1];
    if (!allowedDomains.includes(domain)) {
      setErrorState({
        field: "email",
        message: "Email domain is not supported",
      });
      return;
    }

    try {
      await UsersAPI.updateEmail(infoToken.user?.user_id ?? '', email)

      setErrorState({
        field: "ok",
        message: "Email updated"
      });

    } catch (err) {
      setErrorState({
        field: "error",
        message: "Email update error"
      });
      console.error("update error:", err)
    }
  }

  const emailInfo = (
    <>
      <div className={style.text}>
        your email: {user?.email}
      </div>
      <Button onClick={() => setChangeEmail(true)}>change email</Button>
    </>
  )

  const enterEmail = (
    <>
      <p className={style.text}>Enter your email to receive a notification</p>
      {errorState.field === 'ok'
        ? <div className='_susses'>{errorState.message}</div>
        : null
      }
      {errorState.field === 'email'
        ? <div className='_error'>{errorState.message}</div>
        : null
      }
      <FormMain
        sendEmail={sendEmail}
        error={errorState}
        labelUserName={'Enter your email'}
        oneInput
        email={email}
        setEmail={setEmail}
      />
    </>
  )

  console.log(user)

  return (
    <div className="_container">
      <div className={style.wrapper}>
        <h1 className='_h1'>Welcome {infoToken.user?.username}</h1>

        <div className={style.inner}>
          <div className={style.text}>Registration date: {fotmatedAt(user?.date_reg ?? '')}</div>
          {!user?.email || changeEmail ? enterEmail : emailInfo}
        </div>
      </div>
    </div>
  )
}

export default Account