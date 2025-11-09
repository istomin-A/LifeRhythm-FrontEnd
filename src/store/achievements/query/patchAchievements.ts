import api from "../../baseAPIAxios";
import type { AchievementsType } from '../types'

// patchAchievements on user_id
export const patchAchievements = async (
  userId: string,
  achievementId: number,
  status: string,
  dateAchieved: string
): Promise<AchievementsType> => {
  const response = await api.patch(`/api/achievements/${userId}/${achievementId}`, {
    status,
    dateAchieved
  });
  return response.data;
};