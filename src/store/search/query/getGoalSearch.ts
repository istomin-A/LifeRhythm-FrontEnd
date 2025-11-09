import api from "../../baseAPIAxios";
import type { ResultSearchType } from './type'

// getSearch on user_id
export const getGoalSearch = async (userId: string, query: string): Promise<ResultSearchType> => {
  const response = await api.get(`/api/search/${userId}`, { params: { q: query } });
  return response.data;
};