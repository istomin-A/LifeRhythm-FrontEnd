import api from "../../baseAPIAxios";
import type { Goal } from '../types'

// deleteGoal on createAt
export const deleteGoal = async (userId: string, createAt: string): Promise<Goal> => {
  const response = await api.delete(`/api/goals/${userId}/${createAt}`);
  return response.data;
};
