import SearchIcon from '@/shared/images/search.svg?react';
import Input from '@/shared/ui/Input'
import style from './form.module.scss'

function FormSearch() {
  return (
    <form action="#" className={style.form}>
      <Input
        search
        type="text"
        required
        placeholder="Search task"
        id="search-task"
        name="search-task"
      />
      <button
        className={style.button}
        type='submit'
      >
        <SearchIcon className={style.icon} />
      </button>
    </form>
  )
}

export default FormSearch