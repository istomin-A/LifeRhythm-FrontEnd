import api from "../../baseAPIAxios";
import type { User } from '../types'

export const getUser = async (userId: string): Promise<User> => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};
