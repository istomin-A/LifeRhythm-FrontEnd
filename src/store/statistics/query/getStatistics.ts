import api from "../../baseAPIAxios";
import type { StatisticsType } from '../types'

// getStatistics on user_id
export const getStatistics = async (userId: string): Promise<StatisticsType> => {
  const response = await api.get(`/api/statistics/${userId}`);
  return response.data;
};
