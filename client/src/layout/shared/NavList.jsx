import React from 'react';
import { Navbar, Collapse, Typography, IconButton, List, ListItem, Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react';
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Bars4Icon, GlobeAmericasIcon, PhoneIcon, SquaresPlusIcon, SunIcon, UserGroupIcon } from '@heroicons/react/24/solid';

const navListMenuItems = [
  {
    title: 'Products',
    description: 'Find the perfect solution for your needs.',
    icon: SquaresPlusIcon
  },
  {
    title: 'About Us',
    description: 'Meet and learn about our dedication',
    icon: UserGroupIcon
  },
  {
    title: 'Blog',
    description: 'Find the perfect solution for your needs.',
    icon: Bars4Icon
  },
  {
    title: 'Services',
    description: 'Learn how we can help you achieve your goals.',
    icon: SunIcon
  },
  {
    title: 'Support',
    description: 'Reach out to us for assistance or inquiries',
    icon: GlobeAmericasIcon
  },
  {
    title: 'Contact',
    description: 'Find the perfect solution for your needs.',
    icon: PhoneIcon
  }
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(({ icon, title, description }, key) => (
    <a href="#" key={key}>
      <MenuItem className="flex items-center gap-3 rounded-lg">
        <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
          {React.createElement(icon, {
            strokeWidth: 2,
            className: 'h-6 text-gray-900 w-6'
          })}
        </div>
        <div>
          <Typography variant="h6" color="blue-gray" className="flex items-center text-sm font-bold">
            {title}
          </Typography>
          <Typography variant="paragraph" className="text-xs !font-medium text-blue-gray-500">
            {description}
          </Typography>
        </div>
      </MenuItem>
    </a>
  ));

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} offset={{ mainAxis: 20 }} placement="top" allowHover={true}>
      <MenuHandler>
        <ListItem
          className="flex items-center gap-2 py-2"
          selected={isMenuOpen || isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((cur) => !cur)}
        >
          Sản phẩm
          <ChevronDownIcon strokeWidth={2.5} className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? 'rotate-180' : ''}`} />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? 'rotate-180' : ''}`}
          />
        </ListItem>
      </MenuHandler>
      <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
        <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">{renderItems}</ul>
      </MenuList>
    </Menu>
  );
}

export default function MegaMenuWithPlacement() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  return (
    <div className="mx-auto px-4 py-2">
      <div className="flex gap-4 items-center text-border font-medium">
        <ListItem className="py-2 w-[200px]">Trang chủ</ListItem>
        <ListItem className="py-2 w-[200px]">Về chúng tôi</ListItem>
        <NavListMenu />
      </div>
    </div>
  );
}
