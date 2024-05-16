import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { items } from './items';
import { Buttonz, Linkz } from '@components/core';
import { Logo } from '@components/base';
import { useToastState } from '@store';
import { INITIAL_USER_INFO, useAuthContext } from '@context/AuthContext';
import { AvatarSection, ContactSection, Menuz, NewsSection, NotifySection, ProductDialog, SearchSection } from '@layout/shared';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const WebLayout = ({ children }) => {
  const { isAuthenticated, setUserInfo, setIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const { showToast } = useToastState();
  const { pathname } = useLocation();
  const [select, setSelect] = useState(null);
  const isCart = pathname === '/payment';

  const onSignOut = () => {
    setUserInfo(INITIAL_USER_INFO);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    showToast({ title: 'Đăng xuất thành công', severity: 'success' });
  };

  useEffect(() => {
    let item;
    if (pathname === '/') item = { label: 'Trang chủ', route: '/' };
    else {
      items.forEach((i) => {
        if (i.route && i.route === pathname) item = i;
        else item = i.children?.find((c) => c.route === pathname);
      });
    }
    if (item) {
      setSelect(item.route);
      document.title = item.label;
    }
  }, [pathname]);

  return (
    <div className="antialiased font-normal text-base text-color transition-all duration-500 ease-in-out ">
      <ProductDialog />
      <div className="fixed inset-x-0 top-0 h-16 bg-sidebar shadow-blue-gray-900/5 z-[51]">
        <div className="container flex justify-between items-center h-full">
          <div className="flex gap-12 items-center">
            <Linkz to="/" className="flex gap-4 items-center !text-border">
              <Logo size={8} className="text-xl" />
            </Linkz>
            <div className="flex gap-2 justify-center items-center">
              {items?.map((item, index) => {
                if (item.route)
                  return (
                    <Linkz key={index} to={item.route}>
                      <Buttonz
                        variant="text"
                        color="white"
                        className={`!py-2 !px-3 transition-all duration-300 ease-in-out text-border font-medium text-base 
                      !normal-case !bg-none hover:bg-hover-sidebar ${select === item.route ? 'bg-hover-sidebar' : ''}`}
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
              <Buttonz
                onClick={() => navigate('/payment')}
                color="gray"
                variant="text"
                className={`!p-0 hover:bg-hover-sidebar ${isCart ? 'bg-hover-sidebar' : ''}`}
              >
                <ShoppingCartIcon className="w-6 m-2 text-on-sidebar" />
              </Buttonz>
              <NotifySection mode="web" />
              <AvatarSection mode="web" onSignOut={onSignOut} />
            </div>
          ) : (
            <Buttonz onClick={() => navigate('/auth/signin')}>Đăng nhập</Buttonz>
          )}
        </div>
      </div>
      <div className="mt-16 mx-auto min-h-screen z-10">{children}</div>
      <div className="fixed">
        <div className="flex justify-between">
          <NewsSection />
          <ContactSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WebLayout;
