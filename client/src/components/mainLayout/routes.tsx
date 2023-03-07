import LandingPage from 'pages/clientPage/landingPage';
import Login from 'pages/clientPage/login';
import { lazy, ReactElement } from 'react';

interface IRoutes {
  path: string;
  element: ReactElement;
  isPrivate: boolean;
  children: IRoutesChildren[];
}

interface IRoutesChildren {
  path: string;
  element: ReactElement;
  isIndex: boolean;
}

const ClientPage = lazy(() => import('pages/clientPage'));

export const routes: IRoutes[] = [
  {
    path: '/',
    element: <ClientPage />,
    isPrivate: false,
    children: [
      {
        path: '',
        isIndex: true,
        element: <LandingPage />
      },
      {
        path: 'login',
        isIndex: false,
        element: <Login />
      }
    ]
  }
];
