import type { tabTypes } from './tabs.type'
import style from './tabs.module.scss'

function Tabs({
  error,
  activeTab,
  setActiveTab,
  tabOne,
  tabTwo,
  tabThree,
  tabFour
}: tabTypes) {
  const handleClick = (index: number) => setActiveTab(index)

  return (
    <div className={style.tabs}>
      <h2 className="_visually-hidden" id="category-title">Управление целями</h2>
      <div className={style.tabsHeader}>
        <div className={style.wrapperButtons} role="tablist" aria-labelledby="category-title">
          <div className={activeTab === 1 ? `${style.inner} ${style._active}` : style.inner}>
            <button
              className={activeTab === 1 ? `${style.button} ${style._active}` : style.button}
              type="button"
              id="tab-one"
              role="tab"
              aria-controls="tabpanel-one"
              aria-selected="true"
              onClick={() => handleClick(1)}
            >Active Goals</button>
          </div>
          <div className={activeTab === 2 ? `${style.inner} ${style._active}` : style.inner}>
            <button
              className={activeTab === 2 ? `${style.button} ${style._active}` : style.button}
              type="button"
              id="tab-two"
              role="tab"
              aria-controls="tabpanel-two"
              aria-selected="false"
              onClick={() => handleClick(2)}
              tabIndex={0}
            >Creating a Goal</button>
          </div>
          <div className={activeTab === 3 ? `${style.inner} ${style._active}` : style.inner}>
            <button
              className={activeTab === 3 ? `${style.button} ${style._active}` : style.button}
              type="button"
              id="tab-three"
              role="tab"
              aria-controls="tabpanel-three"
              aria-selected="false"
              onClick={() => handleClick(3)}
              tabIndex={0}
            >Completed</button>
          </div>
          <div className={activeTab === 4 ? `${style.inner} ${style._active}` : style.inner}>
            <button
              className={activeTab === 4 ? `${style.button} ${style._active}` : style.button}
              type="button"
              id="tab-four"
              role="tab"
              aria-controls="tabpanel-four"
              aria-selected="false"
              onClick={() => handleClick(4)}
              tabIndex={0}
            >Overdue</button>
          </div>
        </div>
      </div>
      <div className="__body" role="tabpanel">
        {activeTab === 1 && (
          <div
            className={style.content}
            id="tabpanel-one"
            aria-labelledby="tab-one"
          >{tabOne}</div>
        )}
        {activeTab === 2 && (
          <div
            className={style.content}
            id="tabpanel-two"
            aria-labelledby="tab-two"
          >
            <div className={style.wrapperForm}>
              <h3 className={style.titleTab}>Create a goal</h3>
              {error.field === 'ok'
                ? <div className='_susses'>{error.message}</div>
                : null}
              {tabTwo}
            </div>
          </div>
        )}
        {activeTab === 3 && (
          <div
            className={style.content}
            id="tabpanel-three"
          >{tabThree}</div>
        )}
        {activeTab === 4 && (
          <div
            className={style.content}
            id="tabpanel-four"
          >{tabFour}</div>
        )}
      </div>
    </div>
  )
}

export default Tabs