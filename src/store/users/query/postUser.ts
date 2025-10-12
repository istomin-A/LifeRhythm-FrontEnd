import api from "../../baseAPIAxios";
import type { User } from "../types";

export const postUser = async (user: Omit<User, "id" | "date_reg">): Promise<User> => {
  const response = await api.post("/users", user);
  return response.data;
};
