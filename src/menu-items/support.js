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
      icon: icons.InfoCircleOutlined
    }
  ]
};

export default support;