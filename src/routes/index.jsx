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

      const redirect = Cookies.get('redirect');

      const isUnAuthRoute = ['/', '/login', '/register', '/auth/callback', '/password/forgot', '/password/reset', '/check-mail'].includes(redirect ?? currentLocation.pathname);
      const isConfigRoute = ['/app/p/card/:cardId'].includes(redirect ?? currentLocation.pathname);
      const hasLocalStorage = user !== null;
      const hasConfig = config !== null;

      if(currentLocation.pathname=='/loading'){
        return;
      }

      if(isLoggedIn){

        if(!hasLocalStorage){
          Cookies.set('redirect', currentLocation.pathname);
          navigate('/loading');
        }

        if(isUnAuthRoute && currentLocation.pathname!='/dashboard'){
          navigate('/dashboard');
        }
        
      }else{
        if(!isUnAuthRoute && isConfigRoute){
          if(!hasConfig){
            Cookies.set('redirect', currentLocation.pathname);
            navigate('/loading');
          }
        }else if(!isUnAuthRoute){
          navigate('/login')
        }
      }

      if(redirect){
        navigate(redirect);
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