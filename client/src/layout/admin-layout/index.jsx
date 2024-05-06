import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import TopBar from './topbar';

const AdminLayout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const checkWindowSize = () => {
      if (window.innerWidth < 1300) setShowSidebar(false);
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
      <TopBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} />
      <div className={`relative transition-all duration-500 ease-in-out p-4 mt-20 ${showSidebar ? 'ml-64' : ''}`}>{children}</div>
    </div>
  );
};

export default AdminLayout;
