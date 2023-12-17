import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MinimalLayout from "../layout/minimal/MinimalLayout";
import CheckMail from '../pages/authentication/CheckMail';

const AuthLogin = Loadable(lazy(() => import('../pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('../pages/authentication/Register')));
const AuthCallback = Loadable(lazy(() => import('../pages/authentication/AuthCallback')));
const ForgotPassword = Loadable(lazy(() => import('../pages/authentication/ForgotPassword')));
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));

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
      },
      {
        path: 'password/forgot',
        element: <ForgotPassword />
      },
      {
        path: 'password/reset',
        element: <ResetPassword />
      },
      {
        path: 'check-mail',
        element: <CheckMail />
      },
    ]
  };
  
  export default LoginRoutes;