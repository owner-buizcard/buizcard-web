import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MinimalLayout from "../layout/minimal/MinimalLayout";
import CheckMail from '../pages/authentication/CheckMail';
import VerifyEmail from '../pages/settings/VerifyEmail';
import Initialize from '../pages/authentication/Initialize';

const AuthLogin = Loadable(lazy(() => import('../pages/authentication/Login')));
const AuthVerification = Loadable(lazy(() => import('../pages/authentication/Verfication')));
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
        path: 'code-verification',
        element: <AuthVerification />
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
        path: 'verify-email',
        element: <VerifyEmail />
      },
      {
        path: 'check-mail',
        element: <CheckMail />
      },
      {
        path: '/info',
        element: <Initialize />
      },
    ]
  };
  
  export default LoginRoutes;