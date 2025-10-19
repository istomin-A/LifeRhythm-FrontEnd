import api from "../../baseAPIAxios";
import type { User } from "../types";

export const updateEmail = async (userId: string, email: string): Promise<User> => {
  const response = await api.patch(`/users/update-email/${userId}`, { email });
  return response.data;
};
