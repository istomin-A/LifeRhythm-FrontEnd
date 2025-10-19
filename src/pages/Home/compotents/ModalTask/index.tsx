import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Modal from '@/widgets/Modal'

import Button from '@/shared/ui/Button'

import type { ModalTaskType } from './modalTask'
import style from './modalTask.module.scss'

function ModalTask({
  isOpenModal,
  setIsOpenModal,
  selectedGoal,
  onSelectDate
}: ModalTaskType) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [isLocked, setIsLocked] = useState(false)

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const newDate = new Date(date)
      newDate.setHours(0, 0, 0, 0)
      setSelectedDate(newDate)
      setIsLocked(true)
      onSelectDate?.(selectedGoal?.createdAt ?? "", newDate?.toISOString())
    }
  };

  useEffect(() => {
    if (selectedGoal?.endDateTask && selectedGoal.endDateTask !== '') {
      setSelectedDate(new Date(selectedGoal.endDateTask));
    } else if (selectedGoal?.status === 'done' && selectedGoal.endDateTask === '') {
      setSelectedDate(null);
    }
  }, [selectedGoal]);

  let isTaskOverdue
  if (selectedGoal?.endDateTask) {
    const currentEndDate = new Date(selectedGoal.endDateTask).getTime()
    isTaskOverdue = currentEndDate < new Date().getTime()
  }

  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <Modal isOpen={isOpenModal} setIsOpenModal={setIsOpenModal}>
      <h2 className={style.title}>Detailed information about the task</h2>
      <div className={style.dateWrapper}>
        <p className={style.text}>
          {
            isTaskOverdue
              ? <span className='_error'>Task is overdue</span>
              : selectedGoal?.status === 'done' && selectedGoal.endDateTask === ''
                ? 'The task completion date was not set.' : selectedGoal?.endDateTask ?
                  'Task completion date'
                  : 'Select a task completion date'
          }
        </p>
        <DatePicker
          className={style.datePicker}
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={tomorrow}
          dateFormat="dd.MM.yyyy"
          disabled={isLocked || selectedGoal?.endDateTask !== '' || selectedGoal?.status === 'done'}
        />
        {isLocked && (<div className={style.textActive}>Date selected</div>)}
        {selectedGoal?.status === 'active' && (
          <div className={`${style.text} ${style.wrapper}`}>
            To receive a notification by email, enter it
            <Button link={'account'}>Enter email</Button>
          </div>
        )}
      </div>
      <div className={style.wrapper}>
        <div>Goal: {selectedGoal?.titleGoal}</div>
        <div>Creation date: {selectedGoal?.fotmatedAt}</div>
        <div>Description: {selectedGoal?.descriptoinGoal}</div>
      </div>
    </Modal>
  )
}

export default ModalTask