export const items = [
  { label: 'Trang chủ', route: '/' },
  { label: 'Về chúng tôi', route: '/about' },
  {
    label: 'Sản phẩm',
    children: [
      { label: 'Đèn ngủ DIY', route: '/diy-night-light' },
      { label: 'Đèn ngủ 3D', route: '/3d-night-light' },
      { label: 'Tranh DIY', route: '/diy-painting' }
    ]
  }
];
