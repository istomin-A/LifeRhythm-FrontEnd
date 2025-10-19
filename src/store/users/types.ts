export interface User {
  id: number;
  username: string;
  password: string;
  email?: string;
  date_reg: string;
  token?: string;
}