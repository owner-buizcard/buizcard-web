import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MinimalLayout from "../layout/minimal/MinimalLayout";
import Bizcard from '../pages/bizcard/Bizcard';
import SpreadsheetCallback from '../pages/integrations/callback/SpreadsheetCallback';

const Loader = Loadable(lazy(() => import('../pages/loader/MainLoader')));

const CommonRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
      {
        path: 'loading',
        element: <Loader />
      },
      {
        path: 'app/p/card/:cardId',
        element: <Bizcard />
      },
      {
        path: 'i/spreadsheet/callback',
        element: <SpreadsheetCallback />
      }
    ]
  };
  
  export default CommonRoutes;