import api from "../../baseAPIAxios";
import type { ShareAchievements } from '../types'

// getAchievements on user_id
export const getAchievements = async (userId: string): Promise<ShareAchievements> => {
  const response = await api.get(`/api/achievements/${userId}/share`);
  return response.data;
};
