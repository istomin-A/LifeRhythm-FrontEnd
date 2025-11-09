import api from "../../baseAPIAxios";
import type { LinkDB } from '../types'

// getLink on user_id
export const getLink = async (userId: string): Promise<LinkDB> => {
  const response = await api.get(`/api/achievements/${userId}/link`);
  return response.data;
};
