import api from "../../baseAPIAxios";
import type { AchievementsType } from '../types'

// getAchievementsForToken on user_id
export const getAchievementsForToken = async (token: string): Promise<AchievementsType> => {
  const response = await api.get(`/api/achievements/public/${token}`);
  return response.data;
};