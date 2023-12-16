import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/main/MainLayout';
import CreateCard from '../pages/cards/create/CreateCard';
import CardDetails from '../pages/cards/view/CardDetails';
import ContactList from '../pages/contacts/list/ContactList';

// render - dashboard
const Dashboard = Loadable(lazy(() => import('../pages/dashboard/Dashboard')));

const MainRoutes = {
  path: '/',
  element: <MainLayout/>,
  children: [
    {
      path: '/dashboard',
      element: <Dashboard />
    },
    {
      path: '/dashboard/contacts',
      element: <ContactList />
    },
    {
      path: '/dashboard/card',
      element: <CreateCard />
    },
    {
      path: '/dashboard/card-details',
      element: <CardDetails />
    }
  ]
};

export default MainRoutes;
