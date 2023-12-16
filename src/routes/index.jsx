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
  const config = useSelector((state) => state.app.config);
  const currentLocation = useLocation();

  useEffect(() => {
      const isLoggedIn = checkCookies();
      const hasLocalStorage = user !== null;
      const isUnAuthRoute = ['/', '/login', '/signup'].includes(currentLocation.pathname);
      const isCardPath = currentLocation.pathname.includes('/app/p/card');
      const isConfig = config!=null;

      if (isLoggedIn && isCardPath) {
          if (!hasLocalStorage) {
              Cookies.set('redirect', currentLocation.pathname);
              navigate('/loading');
          }
      } else if (isLoggedIn && isCardPath && hasLocalStorage) {

      } else if (!isLoggedIn && !isConfig && isCardPath) {
          Cookies.set('redirect', currentLocation.pathname);
          navigate('/loading');
      } else if(isConfig && isCardPath){

      } else if (currentLocation.pathname !== '/loading') {
          if (isUnAuthRoute) {
              if (isLoggedIn) {
                  const authRedirect = Cookies.get('auth-redirect');
                  Cookies.remove('auth-redirect');

                  navigate(hasLocalStorage ? (authRedirect ?? '/app/cards') : '/loading');
              }
          } else {
              if (!isLoggedIn && isCardPath) {
                  navigate('/login');
              } else if (!hasLocalStorage) {
                  Cookies.set('redirect', currentLocation.pathname);
                  navigate('/loading');
              }
          }
      }

  }, [user, navigate, currentLocation]);

  return <>{children}</>;
};

export default function ThemeRoutes() {
  return (
    <CheckAuthAndStorage>
      {
        useRoutes([CommonRoutes, MainRoutes, LoginRoutes])
      }
    </CheckAuthAndStorage>
  )
}