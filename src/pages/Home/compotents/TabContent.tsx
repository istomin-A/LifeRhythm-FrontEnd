import Button from '@/shared/ui/Button';
import type { TabContentProps } from './tabContent.type';
import style from './tabContent.module.scss';

function TabContent({
  infoToken,
  errorGetGoals,
  errorUpdateGoals,
  goals,
  updateGoalStatus,
  removeGoal,
}: TabContentProps) {
  if (errorGetGoals) return <div>{errorGetGoals}</div>;
  if (errorUpdateGoals) return <div>{errorUpdateGoals}</div>;
  if (!goals || goals.length === 0) return <div>Нет задач</div>;

  return (
    <div className={style.wrapperGoals}>
      {goals.map((goal) => (
        <div
          className={style.innerGoal}
          key={`${goal.titleGoal}-${goal.fotmatedAt}`}
        >
          <div className={style.boxGoal}>
            <div className={style.titleGoal}>
              <div className={style.textBold}>Задача:</div>
              {goal.titleGoal}
            </div>
            <div className={style.createdGoal}>
              <div className={style.textBold}>Создана:</div>
              {goal.fotmatedAt}
            </div>
          </div>
          <div className={`${style.boxGoal} ${style.gridEnd}`}>
            {goal.status === 'active' && (
              <Button
                onClick={() =>
                  updateGoalStatus?.(
                    String(infoToken?.user?.user_id),
                    encodeURIComponent(String(goal.createdAt)),
                    'done'
                  )
                }
              >
                Выполнена
              </Button>
            )}
            <Button
              onClick={() =>
                removeGoal?.(
                  String(infoToken?.user?.user_id),
                  encodeURIComponent(String(goal.createdAt))
                )
              }
            >
              Удалить
            </Button>
          </div>
          <div className={style.wrapperDescriptoinGoal}>
            <div className={style.textBold}>Описание:</div>
            {goal.descriptoinGoal}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TabContent;