import api from "../../baseAPIAxios";
import type { Goal } from "../types";

export const updateGoalStatus = async (
  userId: string,
  createAt: string,
  status: string,
  dateDone: string
): Promise<Goal> => {
  const response = await api.patch(`/api/goals/${userId}/${createAt}`, { status, dateDone });
  return response.data;
};