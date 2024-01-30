// assets
import { UserOutlined, SettingOutlined } from '@ant-design/icons';

// icons
const icons = {
  UserOutlined,
  SettingOutlined
};

// ==============================|| MENU - SAMPLE PAGE & DOCUMENTATION ||============================== //

const profile = {
  id: 'profile',
  title: 'Profile',
  type: 'group',
  children: [
    {
      id: 'my-profile',
      title: 'My Profile',
      type: 'item',
      url: '/dashboard/profile',
      icon: icons.UserOutlined
    },
    {
      id: 'settings',
      title: 'Account Settings',
      type: 'item',
      url: '/dashboard/settings',
      icon: icons.SettingOutlined
    }
  ]
};

export default profile;