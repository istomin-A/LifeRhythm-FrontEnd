import style from './footer.module.scss'

function Footer() {
  return (
    <footer className={style.footer}>
      <div className='_container'>
        <div className={style.wrapper}>
          © 2025 LifeRhythm. Все права защищены.
        </div>
      </div>
    </footer>
  )
}

export default Footer