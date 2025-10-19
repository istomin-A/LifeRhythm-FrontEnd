import api from "../../baseAPIAxios";
import type { Goal } from "../types";

export const sendEmail = async (
  userId: string,
  createAt: string,
  to: string,
  subject: string,
  text: string
): Promise<Goal> => {
  const response = await api.post(`/api/goals/send-email/${userId}/${createAt}`, { to, subject, text });
  return response.data;
};