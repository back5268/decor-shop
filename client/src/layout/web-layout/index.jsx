import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { items } from './items';
import { Buttonz, Cardz, Linkz } from '@components/core';
import { Logo } from '@components/base';
import { useToastState, useUserState } from '@store';
import { INITIAL_USER_INFO, useAuthContext } from '@context/AuthContext';
import { AvatarSection, ContactSection, Menuz, NewsSection, ProductDialog, SearchSection } from '@layout/shared';
import { Bars3Icon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import SidebarWeb from './SideBar';

const WebLayout = ({ children }) => {
  const { isAuthenticated, userInfo, setUserInfo, setIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const { showToast } = useToastState();
  const { pathname } = useLocation();
  const [select, setSelect] = useState(null);
  const isCart = pathname === '/payment';
  const [showSidebar, setShowSidebar] = useState(false);

  const onSignOut = () => {
    setUserInfo(INITIAL_USER_INFO);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    showToast({ title: 'Đăng xuất thành công', severity: 'success' });
    navigate('/');
  };

  useEffect(() => {
    const checkWindowSize = () => {
      if (window.innerWidth < 1024) setShowSidebar(false);
      else setShowSidebar(true);
    };
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);
    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };
  }, []);

  useEffect(() => {
    let item;
    if (pathname === '/') item = { label: 'Trang chủ', route: '/' };
    else {
      items.forEach((i) => {
        if (!i.route && !item) item = i.children?.find((c) => c.route === pathname);
        else if (i.route === pathname) item = i;
      });
    }
    if (item) {
      setSelect(item.route);
      document.title = item.label;
    }
  }, [pathname, JSON.stringify(items)]);

  return (
    <div className="antialiased font-normal text-base text-color transition-all duration-500 ease-in-out">
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed inset-x-0 inset-y-0 bg-black bg-opacity-50 z-30 w-screen h-screen block lg:hidden"
        ></div>
      )}
      <SidebarWeb showSidebar={showSidebar} />
      <ProductDialog />
      <Cardz className="fixed inset-x-0 top-0 h-16 shadow-blue-gray-900/5 z-10">
        <div className="sm:container flex justify-between items-center h-full w-full">
          <div className="block lg:hidden">
            <Buttonz onClick={() => setShowSidebar(!showSidebar)} variant="text" color="white" className="p-1 text-color">
              <Bars3Icon className="h-8 w-8 stroke-1" />
            </Buttonz>
          </div>
          <div className="gap-12 items-center hidden lg:flex">
            <Linkz to="/" className="flex gap-4 items-center !text-color">
              <Logo size="[8px]" className="text-xl" />
            </Linkz>
            <div className="flex gap-2 justify-center items-center">
              {items?.map((item, index) => {
                if (item.route)
                  return (
                    <Linkz key={index} to={item.route}>
                      <Buttonz
                        variant="text"
                        color="white"
                        className={`!py-2 !px-3 transition-all duration-300 ease-in-out text-color font-medium text-base 
                      !normal-case !bg-none hover:bg-blue-gray-50 ${select === item.route ? 'bg-blue-gray-50' : ''}`}
                      >
                        {item.label}
                      </Buttonz>
                    </Linkz>
                  );
                else if (item.children.length) return <Menuz key={index} label={item.label} items={item.children} select={select} />;
              })}
            </div>
          </div>
          <SearchSection />
          {isAuthenticated ? (
            <div className="flex gap-4 items-center">
              <div className="relative">
                <Buttonz
                  onClick={() => navigate('/payment')}
                  color="gray"
                  variant="text"
                  className={`!p-0 hover:bg-blue-gray-50 ${isCart ? 'bg-blue-gray-50' : ''}`}
                >
                  <ShoppingCartIcon className="w-6 m-2 text-color" />
                </Buttonz>
                {userInfo?.countCart > 0 && <span className="p-[0.25rem] rounded-full bg-red-600 absolute top-[0.4rem] right-[0.3rem]"></span>}
              </div>
              <AvatarSection mode="web" onSignOut={onSignOut} />
            </div>
          ) : (
            <Buttonz onClick={() => navigate('/auth/signin')}>Đăng nhập</Buttonz>
          )}
        </div>
      </Cardz>
      <div className="mt-16 mx-auto min-h-screen z-10">{children}</div>
      <div className="fixed">
        <div className="flex justify-between">
          <ContactSection />
        </div>
      </div>
      <Footer />
      <NewsSection />
    </div>
  );
};

export default WebLayout;
