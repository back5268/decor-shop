import React, { useEffect, useState } from 'react';
import { INITIAL_USER_INFO, useAuthContext } from '@context/AuthContext';
import { useToastState } from '@store';
import { useNavigate } from 'react-router-dom';
import TopBar from './Topbar';
import Sidebar from './SideBar';
import { ProductDialog } from '@layout/shared';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(true);
  const { setUserInfo, setIsAuthenticated } = useAuthContext();
  const { showToast } = useToastState();

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

  return (
    <div className="antialiased font-normal text-base text-color">
      <ProductDialog />
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed inset-x-0 inset-y-0 bg-black bg-opacity-50 z-30 w-screen h-screen block lg:hidden"
        ></div>
      )}
      <TopBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} onSignOut={onSignOut} />
      <Sidebar showSidebar={showSidebar} onSignOut={onSignOut} />
      <div className={`relative transition-all duration-500 ease-in-out p-6 mt-20 ${showSidebar ? 'lg:ml-[18rem]' : ''}`}>{children}</div>
    </div>
  );
};

export default AdminLayout;
