// assets
import { ApiOutlined, ContactsOutlined, CreditCardOutlined, DashboardOutlined, LineChartOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  CreditCardOutlined,
  ContactsOutlined,
  LineChartOutlined,
  ApiOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'My Cards',
      type: 'item',
      url: '/dashboard',
      icon: icons.CreditCardOutlined,
      breadcrumbs: false,
    },
    {
      id: 'contacts',
      title: 'Contacts',
      type: 'item',
      url: '/dashboard/contacts',
      icon: icons.ContactsOutlined,
      breadcrumbs: false
    },
    {
      id: 'charts',
      title: 'Analytics',
      type: 'item',
      url: '/dashboard/analytics',
      icon: icons.LineChartOutlined,
      breadcrumbs: false
    },
    {
      id: 'integrations',
      title: 'Integrations',
      type: 'item',
      url: '/dashboard/integrations',
      icon: icons.ApiOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;