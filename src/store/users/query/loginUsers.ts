import api from "../../baseAPIAxios";
import type { User } from "../types";

export const LoginUsers = async (user: Omit<User, "id" | "date_reg">): Promise<User> => {
  const response = await api.post("/users/login", user);
  return response.data;
};