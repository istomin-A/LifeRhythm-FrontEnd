import style from './statistics.module.scss'
import type { TokenProps } from '../Home/home.type'
import { useEffect, useState } from 'react';
import { StatisticsAPI, AchievementsAPI } from "@/store";
import type { StatisticsType, ShareAchievements } from '@/store/statistics/types'
import type { AchievementsType, LinkDB } from '@/store/achievements/types'
import Loading from '@/shared/ui/Loading'
import Error from '@/shared/ui/Error'
import GeneralChart from './GeneralChart'
import Achievements from './Achievements'
import LinesTrend from './LinesTrend'
import Button from '@/shared/ui/Button'
import { fotmatedAt } from '@/shared/utils/fotmatedAt'

function Statistics({ infoToken }: TokenProps) {
  const [statistics, setStatistics] = useState<StatisticsType | null>(null)
  const [achievements, setAchievements] = useState<AchievementsType | null>(null)
  const [link, setLink] = useState<ShareAchievements | null>(null)
  const [linkFromDB, setLinkFromDB] = useState<LinkDB | null>(null)
  const [loading, setLoading] = useState(true);
  const [errorGetStatistics, setErrorGetStatistics] = useState<string | null>(null);
  const [errorPatchAchievements, setErrorPatchAchievements] = useState<string | null>(null);

  useEffect(() => {
    if (!infoToken?.user?.user_id) return;

    const getStatistics = async () => {
      try {
        const data = await StatisticsAPI.getStatistics(String(infoToken.user?.user_id));
        setStatistics(data);
      } catch (err: any) {
        console.error("Failed to load data:", err);
        setErrorGetStatistics("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    getStatistics();

    const getAchievements = async () => {
      try {
        const data = await AchievementsAPI.getAchievements(String(infoToken.user?.user_id));
        setAchievements(data);
      } catch (err: any) {
        console.error("Failed to load data:", err);
        setErrorGetStatistics("Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    getAchievements();

    const getLink = async () => {
      try {
        const data = await AchievementsAPI.getLink(String(infoToken.user?.user_id));
        setLinkFromDB(data);
      } catch (err: any) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    }

    getLink();
  }, [infoToken?.user?.user_id]);

  if (loading) return <Loading />;
  if (errorGetStatistics) return <Error>{errorGetStatistics}</Error>;
  if (errorPatchAchievements) return <div>{errorPatchAchievements}</div>;

  let formatDate
  if (statistics?.state_date) formatDate = fotmatedAt(statistics?.state_date)

  const updateStatusAchievements = (
    userId: string,
    achievementId: number,
    status: string,
    dateAchieved: string
  ) => {
    const updateAchievements = async () => {
      try {
        await AchievementsAPI.patchAchievements(userId, achievementId, status, dateAchieved);
      } catch (err: any) {
        console.error("Failed to update data:", err);
        setErrorPatchAchievements("Failed to update data:")
      }
    };

    updateAchievements();
  }

  const handleDownload = (userId: string) => {
    const download = async () => {
      try {
        await StatisticsAPI.downloadStatistics(userId);
      } catch (err: any) {
        console.error("Failed to download file:", err);
        setErrorPatchAchievements("Failed to download file:")
      }
    };

    download();
  }

  const handleShareAchievements = (userId: string) => {
    const share = async () => {
      try {
        const data = await StatisticsAPI.getAchievements(userId);
        setLink(data)
      } catch (err: any) {
        console.error("Failed to share achievements:", err);
        setErrorPatchAchievements("Failed to share achievements:")
      }
    };

    share();
  }

  const achievementsArray = achievements?.achievements;
  const countDoneGoals = statistics?.done_goals
  const countActiveGoals = statistics?.active_goals
  const countOverdueGoals = statistics?.overdue_goals

  const countWeekOverdueGoals = statistics?.actions.every((statistic) => statistic.overdue_goals === 0)
  const countWeekDoneGoals = statistics?.actions.some((statistic) => statistic.done_goals >= 2)
  const countTwoWeekDoneGoals: Record<string, number> = {};

  statistics?.actions.forEach((item) => {
    const date = fotmatedAt(item.state_date).split(', ')[0];
    if (!countTwoWeekDoneGoals[date] || item.done_goals > countTwoWeekDoneGoals[date]) {
      countTwoWeekDoneGoals[date] = item.done_goals;
    }
  });
  const countTwoWeekKeys = Object.keys(countTwoWeekDoneGoals).length === 7
  const countTwoWeekValues = Object.values(countTwoWeekDoneGoals).every((item) => item > 0)

  if (countDoneGoals && countDoneGoals >= 1) {
    const findAchievement = achievementsArray?.find((achievement) => achievement.achievementsId === 101)
    const achievementsId = findAchievement?.achievementsId || 0
    const isStatusAchievement = findAchievement?.status === 'active'

    isStatusAchievement && updateStatusAchievements(String(infoToken?.user?.user_id), achievementsId, 'done', new Date().toISOString())
  }

  if (countDoneGoals && countDoneGoals >= 5) {
    const findAchievement = achievementsArray?.find((achievement) => achievement.achievementsId === 102)
    const achievementsId = findAchievement?.achievementsId || 0
    const isStatusAchievement = findAchievement?.status === 'active'

    isStatusAchievement && updateStatusAchievements(String(infoToken?.user?.user_id), achievementsId, 'done', new Date().toISOString())
  }

  if (countDoneGoals && countDoneGoals >= 10) {
    const findAchievement = achievementsArray?.find((achievement) => achievement.achievementsId === 103)
    const achievementsId = findAchievement?.achievementsId || 0
    const isStatusAchievement = findAchievement?.status === 'active'

    isStatusAchievement && updateStatusAchievements(String(infoToken?.user?.user_id), achievementsId, 'done', new Date().toISOString())
  }

  if (countWeekOverdueGoals) {
    const findAchievement = achievementsArray?.find((achievement) => achievement.achievementsId === 104)
    const achievementsId = findAchievement?.achievementsId || 0
    const isStatusAchievement = findAchievement?.status === 'active'

    isStatusAchievement && updateStatusAchievements(String(infoToken?.user?.user_id), achievementsId, 'done', new Date().toISOString())
  }

  if (countWeekDoneGoals) {
    const findAchievement = achievementsArray?.find((achievement) => achievement.achievementsId === 106)
    const achievementsId = findAchievement?.achievementsId || 0
    const isStatusAchievement = findAchievement?.status === 'active'

    isStatusAchievement && updateStatusAchievements(String(infoToken?.user?.user_id), achievementsId, 'done', new Date().toISOString())
  }

  if (countTwoWeekKeys && countTwoWeekValues) {
    const findAchievement = achievementsArray?.find((achievement) => achievement.achievementsId === 107)
    const achievementsId = findAchievement?.achievementsId || 0
    const isStatusAchievement = findAchievement?.status === 'active'

    isStatusAchievement && updateStatusAchievements(String(infoToken?.user?.user_id), achievementsId, 'done', new Date().toISOString())
  }

  if (countOverdueGoals && countOverdueGoals >= 5) {
    const findAchievement = achievementsArray?.find((achievement) => achievement.achievementsId === 105)
    const achievementsId = findAchievement?.achievementsId || 0
    const isStatusAchievement = findAchievement?.status === 'active'

    isStatusAchievement && updateStatusAchievements(String(infoToken?.user?.user_id), achievementsId, 'done', new Date().toISOString())
  }

  if (countActiveGoals && countActiveGoals > 0) {
    const findAchievement = achievementsArray?.find((achievement) => achievement.achievementsId === 108)
    const achievementsId = findAchievement?.achievementsId || 0
    const isStatusAchievement = findAchievement?.status === 'active'

    isStatusAchievement && updateStatusAchievements(String(infoToken?.user?.user_id), achievementsId, 'done', new Date().toISOString())
  }

  return (
    <div className="_container">
      <div className={style.wrapper}>
        <p className={style.text}>Statistics update: {formatDate}</p>
        <div className={style.buttons}>
          <Button onClick={() => handleDownload(String(infoToken?.user?.user_id))}>скачать отчет</Button>
          <Button
            onClick={() => handleShareAchievements(String(infoToken?.user?.user_id))}
            className={linkFromDB && linkFromDB.token || link && link.link ? style.buttonLink : ''}
          >поделиться достижениями</Button>
        </div>
        {
          linkFromDB && linkFromDB.token &&
          <div className={style.linkWrapper}>
            <p className={style.text}>Personal achievement link</p>
            <a
              href={`/LifeRhythm-FrontEnd/share-achievements/${linkFromDB.token}`}
              target='_blank'
              className={style.link}
            >
              Share achievements
            </a>
          </div>
        }
        {
          link && link.link &&
          <div className={style.linkWrapper}>
            <p>{link.message}</p>
            <a href={link.link} target='_blank' className={style.link}>Share achievements</a>
          </div>
        }
        <div className={style.inner}>
          <h2 className={style.title}>Task Status Chart</h2>
          <div className={style.chartWrapper}>
            <GeneralChart data={statistics} />
          </div>
          <h2 className={style.title}>Dynamics of completed goals</h2>
          <div className={style.trendWrapper}>
            <LinesTrend data={statistics} />
          </div>
        </div>
        <Achievements data={achievements} />
      </div>
    </div>
  )
}

export default Statistics