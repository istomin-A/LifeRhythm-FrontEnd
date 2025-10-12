import api from "../../baseAPIAxios";
import type { Goal } from "../types";

export const newGoal = async (goal: Goal): Promise<Goal> => {
  const response = await api.post("/api/goals", goal);
  return response.data;
};