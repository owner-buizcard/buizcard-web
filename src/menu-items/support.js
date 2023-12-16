// assets
import { ChromeOutlined, InfoCircleOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined,
  InfoCircleOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'support',
  title: 'Support',
  type: 'group',
  children: [
    {
      id: 'feature-request',
      title: 'Feature Request',
      type: 'item',
      url: '/sample-page',
      icon: icons.InfoCircleOutlined
    },
    {
      id: 'help',
      title: 'Help',
      type: 'item',
      url: 'https://codedthemes.gitbook.io/mantis/',
      icon: icons.QuestionOutlined,
      external: true,
      target: true
    }
  ]
};

export default support;