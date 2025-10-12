import api from "../../baseAPIAxios";
import type { User } from '../types'

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  return response.data;
};
