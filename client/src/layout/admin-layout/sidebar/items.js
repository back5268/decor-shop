import { PresentationChartBarIcon } from '@heroicons/react/24/outline';

const icons = {
    PresentationChartBarIcon,
};

export const items = [
  { label: 'Dashboard', icon: icons.PresentationChartBarIcon, type: 'item', route: '' },
  {
    label: 'Quản lý người dùng',
    icon: '',
    type: 'group',
    items: [
      { label: 'Quản lý nhân viên', type: 'item', route: '/users' },
      { label: 'Quản lý khách hàng', type: 'item', route: '/customers' }
    ]
  }
];
