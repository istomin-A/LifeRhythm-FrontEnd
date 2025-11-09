import SearchIcon from '@/shared/images/search.svg?react';
import Input from '@/shared/ui/Input'
import style from './form.module.scss'
import type { FormSearchTypes } from './types'
import { useState } from 'react';

function FormSearch({ search, isErrorSearch }: FormSearchTypes) {
  const [inputValue, setInputValue] = useState<string>('')

  return (
    <form action="#" className={style.form} onSubmit={(e) => search(e, inputValue)}>
      <Input
        search
        type="text"
        required
        placeholder="Search task"
        id="search-task"
        name="search-task"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={
          !isErrorSearch || isErrorSearch.length > 0
            ? {}
            : { border: "1px solid red" }
        }
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