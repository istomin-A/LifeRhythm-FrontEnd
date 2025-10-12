import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import type { AuthWrapperProps, TokenInfo } from './AuthWrapper.type'
import { UsersAPI } from "@/store";

function AuthWrapper({ children }: AuthWrapperProps) {
  const [infoToken, setInfoToken] = useState<TokenInfo>({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    UsersAPI.verify(token)
      .then((token) => setInfoToken(token))
      .catch(error => {
        console.error('Verification failed:', error);
        navigate("/login");
      })
  }, [navigate, sessionStorage.getItem("token")])

  return (
    <>{children(infoToken)}</>
  )
}

export default AuthWrapper