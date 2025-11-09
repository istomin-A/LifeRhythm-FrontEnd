import { useState } from 'react';

import Button from '@/shared/ui/Button';
import ModalTask from '../ModalTask';

import { fotmatedAt } from '@/shared/utils/fotmatedAt'
import type { TabContentProps } from './TabContent';
import type { GoalItem } from '@/store/goals/types';
import style from './tabContent.module.scss';


function TabContent({
  infoToken,
  sendEmail,
  errorGetGoals,
  errorUpdateGoals,
  goals,
  updateGoalUI,
  removeGoal,
  onSelectDate,
  user
}: TabContentProps) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [selectedGoal, setSelectedGoal] = useState<GoalItem | undefined>();

  if (errorGetGoals) return <div>{errorGetGoals}</div>;
  if (errorUpdateGoals) return <div>{errorUpdateGoals}</div>;
  if (!goals || goals.length === 0) return <div>Нет задач</div>;

  const openModal = (goal: GoalItem) => {
    setSelectedGoal(goal)
    setIsOpenModal(true)
  }

  const sortedGoals = [...goals].sort((a, b) => {
    if (a.status === 'done' && b.status === 'done') {
      return new Date(b.dateDone).getTime() - new Date(a.dateDone).getTime();
    }

    if (a.status === 'done') return -1;

    if (b.status === 'done') return 1;

    return 0;
  });

  return (
    <>
      <div className={style.wrapperGoals}>
        {sortedGoals.map((goal) => {
          const currentEndDate = new Date(goal?.endDateTask).getTime()
          const isTaskOverdue = currentEndDate < new Date().getTime()

          const formatDateDone = goal.dateDone
            ? fotmatedAt(goal.dateDone)
            : null

          if (goal.status === 'active' && isTaskOverdue) {
            updateGoalUI?.(
              String(infoToken?.user?.user_id),
              encodeURIComponent(String(goal.createdAt)),
              'overdue',
              new Date().toISOString()
            )
          }

          if (goal.status === 'active' &&
            isTaskOverdue &&
            infoToken?.user?.user_id &&
            goal?.createdAt &&
            user?.email
          ) {
            sendEmail?.(
              infoToken?.user?.user_id,
              goal?.createdAt,
              user?.email,
              `Task reminder ${goal.titleGoal}`,
              'Task is overdue'
            )
          }

          return (
            <div
              key={`${goal.titleGoal}-${goal.fotmatedAt}`}
              className={style.innerGoal}
              onClick={() => openModal(goal)}
            >
              <div className={style.boxGoal}>
                {
                  goal?.status === 'overdue' && <div className='_error'>Task is overdue</div>
                  ||
                  goal?.status === 'done' && <div className='_susses-done'><span>Task completed: </span>{formatDateDone}</div>
                }
                <div className={style.titleGoal}>
                  <div className={style.textBold}>Task:</div>
                  {goal.titleGoal}
                </div>
              </div>
              <div className={`${style.boxGoal} ${style.gridEnd}`}>
                {goal.status === 'active' && (
                  <Button
                    onClick={(e) =>
                      updateGoalUI?.(
                        String(infoToken?.user?.user_id),
                        encodeURIComponent(String(goal.createdAt)),
                        'done',
                        new Date().toISOString(),
                        e
                      )
                    }
                  >
                    Completed
                  </Button>
                )}
                <Button
                  onClick={(e) =>
                    removeGoal?.(
                      e,
                      String(infoToken?.user?.user_id),
                      encodeURIComponent(String(goal.createdAt))
                    )
                  }
                >
                  Delete
                </Button>
              </div>
              <div className={style.wrapperDescriptoinGoal}>
                <div className={style.textBold}>Description:</div>
                {goal.descriptoinGoal}
              </div>
            </div>
          )
        })}
      </div>

      {isOpenModal &&
        <ModalTask
          selectedGoal={selectedGoal}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          onSelectDate={onSelectDate}
        />}
    </>
  );
}

export default TabContent;