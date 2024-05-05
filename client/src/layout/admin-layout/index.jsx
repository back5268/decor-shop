import React, { useState } from 'react';
import Sidebar from './sidebar';
import TopBar from './topbar';

const AdminLayout = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div>
      <TopBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} />
    </div>
  );
};

export default AdminLayout;
