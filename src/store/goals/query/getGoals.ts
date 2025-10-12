import api from "../../baseAPIAxios";
import type { Goal } from '../types'

// getGoals on user_id
export const getGoals = async (userId: string): Promise<Goal> => {
  const response = await api.get(`/api/goals/${userId}`);
  return response.data;
};
