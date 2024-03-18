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

  console.log("dhana")

  useEffect(() => {
    console.log('dahandjddjjddjdjdj')
      
      const isLoggedIn = checkCookies();


      const redirect = Cookies.get('redirect');

      const isUnAuthRoute = ['/', '/login', '/register', '/auth/callback', '/password/forgot', '/password/reset', '/verify-email', '/check-mail', '/legal/privacy', '/legal/terms'].includes(redirect ?? currentLocation.pathname);

      const routePattern = /^\/app\/p\/card\/\w+$/; 
      const matchesRedirect = redirect && routePattern.test(redirect);
      const matchesCurrentLocation = routePattern.test(currentLocation.pathname);
      const isConfigRoute = matchesRedirect || matchesCurrentLocation;

      const hasLocalStorage = user !== null;
      const hasConfig = config !== null;

      if(currentLocation.pathname=='/loading' || currentLocation.pathname.includes('/i/')){
        return;
      }

      console.log(`local storage: ${hasLocalStorage}`)
      console.log(`config: ${hasConfig}`)

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

  }, [user, navigate, currentLocation, config]);

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