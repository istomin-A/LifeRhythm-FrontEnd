import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AchievementsAPI } from "@/store";
import type { AchievementsType } from '@/store/achievements/types'
import Loading from '@/shared/ui/Loading'
import Achievements from '@/pages/Statistics/Achievements'
import style from './shareAchievements.module.scss'

function ShareAchievements() {
  const { token } = useParams<{ token: string }>(); // <-- здесь получаем токен из URL
  const [achievements, setAchievements] = useState<AchievementsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const getAchievements = async () => {
      try {
        const data = await AchievementsAPI.getAchievementsForToken(token);
        setAchievements(data);
      } catch (err: any) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    }

    getAchievements();
  }, [token]);

  if (loading) return <Loading />;

  return (
    <div className="_container">
      <div className={style.wrapper}>
        <Achievements data={achievements} account />
      </div>
    </div>
  )
}

export default ShareAchievements