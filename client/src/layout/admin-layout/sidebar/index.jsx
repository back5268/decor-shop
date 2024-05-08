import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Logo } from '@components/base';
import NavGroup from './NavGroup';
import { Buttonz, Inputz } from '@components/core';
import { items } from './items';
import NavItem from './NavItem';
import { useLocation } from 'react-router-dom';

const Sidebar = (props) => {
  const { showSidebar, onSignOut } = props;
  const { pathname } = useLocation();
  const [open, setOpen] = useState(0);

  useEffect(() => {
    let title
    const currentIndex = items.findIndex((item) => {
      if (item.type === "item") {
        if ('/admin' + item.route === pathname) title = item.label;
      } else {
        const childIndex = item.items?.findIndex((child) => '/admin' + child.route === pathname);
        if (childIndex >= 0) {
          title = item.items[childIndex].label;
          return true;
        }
      }
    });
    if (currentIndex >= 0) setOpen(currentIndex + 1);
    if (title) document.title = title;
  }, [pathname]);

  return (
    <div
      className={`fixed left-0 inset-y-0 h-screen z-40 w-full max-w-[16rem] p-2 shadow-xl shadow-blue-gray-900/5 
      bg-sidebar text-on-sidebar transition-all duration-500 ease-in-out ${showSidebar ? '' : '-translate-x-full'}`}
    >
      <div className="mb-2 flex items-center gap-4 p-4">
        <div className="flex gap-4 items-center justify-center mb-2">
          <Logo />
          <h3 className="mt-1 pb-1 text-xl font-bold">Decor Day</h3>
        </div>
      </div>
      <Inputz
        size="md"
        className="px-0 !w-full"
        icon={<MagnifyingGlassIcon className="h-5 w-5 text-on-sidebar cursor-pointer" />}
        label="Tìm kiếm"
      />
      <nav className="flex flex-col gap-1 text-base font-normal mt-4 h-body-sidebar">
        {items?.map((item, index) => {
          if (item.type === 'item') return <NavItem key={index} item={item} pathname={pathname} />;
          else return <NavGroup key={index} item={item} value={index + 1} open={open} setOpen={setOpen} pathname={pathname} />;
        })}
      </nav>
      <hr className="my-3 border-on-sidebar" />
      <div className="flex flex-col gap-2">
        <Buttonz className="w-full">Chuyển đến trang chủ</Buttonz>
        <Buttonz onClick={onSignOut} variant="outlined" className="w-full">
          Đăng xuất
        </Buttonz>
      </div>
    </div>
  );
};

export default Sidebar;
