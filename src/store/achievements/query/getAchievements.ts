import api from "../../baseAPIAxios";
import type { AchievementsType } from '../types'

// getAchievements on user_id
export const getAchievements = async (userId: string): Promise<AchievementsType> => {
  const response = await api.get(`/api/achievements/${userId}`);
  return response.data;
};