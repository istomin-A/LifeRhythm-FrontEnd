interface userInfo {
  exp: number;
  iat: number;
  user_id: string;
  username: string;
}

export interface TokenInfo {
  valid?: boolean;
  user?: userInfo;
}

export interface AuthWrapperProps {
  children: (infoToken: TokenInfo) => React.ReactNode;
}