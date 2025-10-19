import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import Textarea from '@/shared/ui/Textarea'
import style from './formmain.module.scss'
import type { FormMainProps } from './formmain.type'

function FormMain({
  error,
  setPassword,
  setUsername,
  setTitleGoal,
  setEmail,
  setDescriptoinGoal,
  username,
  password,
  titleGoal,
  email,
  descriptoinGoal,
  handleAddUser,
  Goals,
  sendEmail,
  labelUserName,
  labelPassword,
  textArea,
  oneInput
}: FormMainProps) {
  return (
    <form className={oneInput ? style.altFormMain : style.formMain} onSubmit={(e) => {
      handleAddUser?.(e)
      Goals?.(e)
      sendEmail?.(e)
    }}>
      <label
        className={style.label}
      >{labelUserName}
        <Input
          value={username ?? titleGoal ?? email ?? ''}
          onChange={(e) => {
            setUsername?.(e.target.value)
            setTitleGoal?.(e.target.value)
            setEmail?.(e.target.value)
          }}
          type="text"
          placeholder={labelUserName}
          name="username"
          style={
            error?.field === "username" || error?.field === 'titleGoal' || error?.field === 'email'
              ? { border: "2px solid red" }
              : {}
          }
        />
      </label>
      {error?.field === "username" || error?.field === 'titleGoal'
        ? <div className={style.error}>{error.message}</div>
        : null}

      {textArea
        ? (
          <label className={style.label}>
            Enter description
            <Textarea
              value={descriptoinGoal ?? ''}
              placeholder={'Enter description'}
              onChange={(e) => {
                setDescriptoinGoal?.(e.target.value)
              }}
              style={
                error?.field === 'descriptoinGoal'
                  ? { border: "2px solid red" }
                  : {}
              }
            />
          </label>
        )
        : !oneInput && (
          <label
            className={style.label}
          >{labelPassword}
            <Input
              value={password ?? ''}
              onChange={e => setPassword?.(e.target.value)}
              type="password"
              placeholder="Enter your password"
              name="password"
              style={
                error?.field === "password"
                  ? { border: "2px solid red" }
                  : {}
              }
            />
          </label>
        )
      }

      {error?.field === "password" || error?.field === 'descriptoinGoal'
        ? <div className={style.error}>{error.message}</div>
        : null}
      <Button className={oneInput ? style.buttonForm : ''} type='submit'>Send</Button>
    </form>
  )
}

export default FormMain