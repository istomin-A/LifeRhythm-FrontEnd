import Modal from '@/widgets/Modal'
import style from './style.module.scss'
import type { ResultSearchModalTypes } from './types'
import Button from '@/shared/ui/Button'
import { fotmatedAt } from '@/shared/utils/fotmatedAt'

function ResultSearchModal({ data, isOpen, setIsOpenModal }: ResultSearchModalTypes) {
  if (!data || data.length <= 0) return

  const currentData = data[0]

  const formateDate = fotmatedAt(currentData?.createdAt)

  let isTaskOverdue
  if (currentData?.endDateTask) {
    const currentEndDate = new Date(currentData.endDateTask).getTime()
    isTaskOverdue = currentEndDate < new Date().getTime()
  }

  console.log('data ьщвфд', data)
  return (
    <Modal isOpen={isOpen} setIsOpenModal={setIsOpenModal}>
      <h2 className={style.title}>Detailed information about the task</h2>
      <div className={style.dateWrapper}>
        <p className={style.text}>
          {
            isTaskOverdue
              ? <span className='_error'>Task is overdue</span>
              : currentData?.status === 'done' && currentData.endDateTask === ''
                ? 'The task completion date was not set.' : currentData?.endDateTask ?
                  'Task completion date'
                  : 'Select a task completion date'
          }
        </p>
        {currentData?.status === 'active' && (
          <div className={`${style.text} ${style.wrapper}`}>
            To receive a notification by email, enter it
            <Button link={'account'}>Enter email</Button>
          </div>
        )}
      </div>
      <div className={style.wrapper}>
        <div>Goal: {currentData?.titleGoal}</div>
        <div>Creation date: {formateDate}</div>
        <div>Description: {currentData?.descriptoinGoal}</div>
      </div>
    </Modal>
  )
}

export default ResultSearchModal