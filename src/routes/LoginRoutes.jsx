import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MinimalLayout from "../layout/minimal/MinimalLayout";
import AuthCallback from '../pages/authentication/AuthCallback';

const AuthLogin = Loadable(lazy(() => import('../pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('../pages/authentication/Register')));

const LoginRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
      {
        path: 'login',
        element: <AuthLogin />
      },
      {
        path: 'register',
        element: <AuthRegister />
      },
      {
        path: 'auth/callback',
        element: <AuthCallback />
      }
    ]
  };
  
  export default LoginRoutes;