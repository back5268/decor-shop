import React, { useEffect } from 'react';
import { Logo } from '@components/base';
import { itemSideBar, items } from './items';
import { useLocation } from 'react-router-dom';
import { NavItem } from '@layout/shared';
import { Hrz } from '@components/core';

const SidebarWeb = (props) => {
  const { showSidebar } = props;
  const { pathname } = useLocation();

  useEffect(() => {
    let title;
    items.findIndex((item) => {
      if (item.type === 'item') {
        if ('/admin' + item.route === pathname) title = item.label;
      } else {
        const childIndex = item.items?.findIndex((child) => pathname.includes('/admin' + child.route));
        if (childIndex >= 0) {
          title = item.items[childIndex].label;
          return true;
        }
      }
    });
    if (title) document.title = title;
  }, [pathname]);

  return (
    <div
      className={`fixed left-0 inset-y-0 h-screen z-[999] w-full max-w-[18rem] p-2 shadow-xl shadow-blue-gray-900/5 lg:hidden
      bg-sidebar text-on-sidebar transition-all duration-500 ease-in-out ${showSidebar ? '' : '-translate-x-full'}`}
    >
      <div className="mb-2 flex items-center gap-4 p-4">
        <Logo />
      </div>
      <Hrz />
      <nav className="flex flex-col gap-1 text-base font-normal mt-4 h-body-sidebar">
        {itemSideBar?.map((item, index) => {
          return <NavItem key={index} item={item} pathname={pathname} type='' />;
        })}
      </nav>
    </div>
  );
};

export default SidebarWeb;
