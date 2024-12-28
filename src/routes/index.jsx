import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import CommonRoutes from './CommonRoutes';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkCookies } from '../utils/utils';
import Cookies from 'js-cookie';

const CheckAuthAndStorage = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.app.user);
  const config = useSelector((state) => state.app.configs);
  const currentLocation = useLocation();

  console.log("I am here");

  useEffect(() => {
    const isLoggedIn = checkCookies();
    const redirect = Cookies.get('redirect');
    const isUnAuthRoute = ['/', '/login', '/code-verification', '/register', '/auth/callback', '/password/forgot', '/password/reset', '/verify-email', '/check-mail', '/legal/privacy', '/legal/terms'].includes(redirect ?? currentLocation.pathname);
    const routePattern = /^\/p\/\w+$/; 
    const matchesRedirect = redirect && routePattern.test(redirect);
    const matchesCurrentLocation = routePattern.test(currentLocation.pathname);
    const isConfigRoute = matchesRedirect || matchesCurrentLocation;
    const hasLocalStorage = user !== null;
    const hasConfig = config !== null;

    console.log("I am here");

    if (currentLocation.pathname === '/loading' || currentLocation.pathname.includes('/i/') || currentLocation.pathname.includes('/p/')) {
      return;
    }

    console.log("I am here too");

    if(!isLoggedIn && !isUnAuthRoute){
      navigate('/login');
    }

    if(isLoggedIn && !hasLocalStorage){
      if(currentLocation.pathname && currentLocation.pathname!='/' && currentLocation.pathname!='/dashboard'){
        Cookies.set('redirect', currentLocation.pathname);
      }
      navigate('/loading');
    }

    if(isLoggedIn && isUnAuthRoute && currentLocation.pathname !== '/dashboard'){
      navigate('/dashboard');
    }
    
  }, [user, navigate, currentLocation, config]);

  return <>{children}</>;
};

export default function ThemeRoutes() {
  return (
    <CheckAuthAndStorage>
      {useRoutes([CommonRoutes, MainRoutes, LoginRoutes])}
    </CheckAuthAndStorage>
  );
}
