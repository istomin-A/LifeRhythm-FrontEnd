import style from './achievements.module.scss'
import type { AchievementsComponent } from './achievements.type'
import { fotmatedAt } from '@/shared/utils/fotmatedAt'
import FirstGoal from '@/shared/images/first-goal.svg?react'
import FiveGoals from '@/shared/images/five-goal.svg?react'
import TenGoals from '@/shared/images/ten-goal.svg?react'
import NoDelays from '@/shared/images/no-delays.svg?react'
import MonthNoDelays from '@/shared/images/month-without-delays.svg?react'
import WeekTwoNoDelays from '@/shared/images/week-2.svg?react'
import EveryDay from '@/shared/images/every-day.svg?react'
import AllCompleted from '@/shared/images/all-completed.svg?react'
import SeveralTasksInOneDay from '@/shared/images/several-tasks-day.svg?react'
import QuickStart from '@/shared/images/quick-start.svg?react'

function Achievements({
  data,
  account
}: AchievementsComponent) {
  const achievements = data?.achievements

  return (
    <div>
      <h3 className={style.title}>Achievements</h3>
      <div className={style.wrapper}>
        {achievements && achievements.filter(achievement => !account || achievement.status === 'done')
          .map((achievement, index) => {
            let IconComponent;

            switch (achievement.achievementsId) {
              case 101:
                IconComponent = <FirstGoal />;
                break;
              case 102:
                IconComponent = <FiveGoals />;
                break;
              case 103:
                IconComponent = <TenGoals />;
                break;
              case 104:
                IconComponent = <NoDelays />;
                break;
              case 105:
                IconComponent = <MonthNoDelays />;
                break;
              case 106:
                IconComponent = <WeekTwoNoDelays />;
                break;
              case 107:
                IconComponent = <EveryDay />;
                break;
              case 108:
                IconComponent = <AllCompleted />;
                break;
              case 109:
                IconComponent = <SeveralTasksInOneDay />;
                break;
              case 110:
                IconComponent = <QuickStart />;
                break;
            }

            const formettedDateAchieved = achievement.dateAchieved ?
              fotmatedAt(String(achievement.dateAchieved)) :
              '--'

            return (
              <div className={achievement.status === 'active' ? `${style.card} ${style.cardNo}` : `${style.card} ${style.cardOk}`} key={`achievement.name-${index}`}>
                <div className={achievement.status === 'active' ? `${style.icon} ${style.iconNo}` : style.icon}>{IconComponent}</div>
                {achievement.status === 'active' ?
                  (<p className='_error'>Not received</p>) :
                  (<p className={style.box}><span>Received:</span> <span>{formettedDateAchieved}</span></p>)
                }
                <p className={style.text}>
                  {achievement.name}
                </p>
                <p className={style.hiddenText}>
                  {achievement.description}
                </p>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Achievements