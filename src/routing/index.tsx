import { createBrowserRouter } from "react-router-dom";
import FullLayout from '@/pages/FullLayout';
import AuthWrapper from "@/processes/auth/AuthWrapper";

import Registration from '@/pages/Registration';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import Account from '@/pages/Account';
import Statistics from '@/pages/Statistics';
import ShareAchievements from '@/pages/ShareAchievements'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <FullLayout />,
    children: [
      // 🔒 защищённые страницы
      {
        index: true,
        element: (
          <AuthWrapper>
            {(infoToken) => <Home infoToken={infoToken} />}
          </AuthWrapper>
        ),
      },
      {
        path: 'account',
        element: (
          <AuthWrapper>
            {(infoToken) => <Account infoToken={infoToken} />}
          </AuthWrapper>
        ),
      },
      {
        path: 'statistics',
        element: (
          <AuthWrapper>
            {(infoToken) => <Statistics infoToken={infoToken} />}
          </AuthWrapper>
        ),
      },
      // 🔓 публичные страницы
      {
        path: 'login',
        element: (
          <Login />
        ),
      },
      {
        path: 'registration',
        element: (
          <Registration />
        ),
      },
      {
        path: 'share-achievements/:token',
        element: (
          <ShareAchievements />
        ),
      },
    ],
  },
],
  {
    basename: "/LifeRhythm-FrontEnd",
  }
);
