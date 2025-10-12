import api from "../../baseAPIAxios";

export const verify = async (token: string) => {
  const response = await api.get("/users/verify", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};