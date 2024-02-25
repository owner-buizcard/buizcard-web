import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MinimalLayout from "../layout/minimal/MinimalLayout";
import Bizcard from '../pages/bizcard/Bizcard';
import SpreadsheetCallback from '../pages/integrations/callback/SpreadsheetCallback';
import ZohoCallback from '../pages/integrations/callback/ZohoCallback';
import HubspotCallback from '../pages/integrations/callback/HubspotCallback';
import Home from '../pages/home/Home';

const Loader = Loadable(lazy(() => import('../pages/loader/MainLoader')));

const CommonRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
      {
        path: '',
        element: <Home/>
      },
      {
        path: 'loading',
        element: <Loader />
      },
      {
        path: 'app/p/card/:cardId',
        element: <Bizcard />
      },
      {
        path: 'i/callback/spreadsheet',
        element: <SpreadsheetCallback />
      },
      {
        path: 'i/callback/zoho',
        element: <ZohoCallback />
      },
      {
        path: 'i/callback/hubspot',
        element: <HubspotCallback />
      }
    ]
  };
  
  export default CommonRoutes;