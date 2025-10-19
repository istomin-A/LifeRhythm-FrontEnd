import api from "../../baseAPIAxios";
import type { Goal } from "../types";

export const setEndDateTask = async (userId: string, createAt: string, endDateTask: string): Promise<Goal> => {
  const response = await api.patch(`/api/goals/end-date/${userId}/${createAt}`, { endDateTask });
  return response.data;
};