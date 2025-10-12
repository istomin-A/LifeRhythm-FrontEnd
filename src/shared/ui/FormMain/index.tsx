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
  setDescriptoinGoal,
  username,
  password,
  titleGoal,
  descriptoinGoal,
  handleAddUser,
  Goals,
  labelUserName,
  labelPassword,
  textArea
}: FormMainProps) {
  return (
    <form className={style.formMain} onSubmit={(e) => {
      handleAddUser?.(e)
      Goals?.(e)
    }}>
      <label
        className={style.label}
      >{labelUserName}
        <Input
          value={username ?? titleGoal ?? ''}
          onChange={(e) => {
            setUsername?.(e.target.value)
            setTitleGoal?.(e.target.value)
          }}
          type="text"
          placeholder="Enter your username"
          name="username"
          style={
            error?.field === "username" || error?.field === 'titleGoal'
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
            Enter discription
            <Textarea
              value={descriptoinGoal ?? ''}
              placeholder={'Enter discription'}
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
        : (
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
      <Button type='submit'>Send</Button>
    </form>
  )
}

export default FormMain