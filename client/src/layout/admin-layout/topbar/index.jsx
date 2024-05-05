import { Buttonz } from '@components/core';
import { Bars3Icon } from '@heroicons/react/24/outline';
import React from 'react';
import AvatarSection from './AvatarSection';
import NotifySection from './NotifySection';

const TopBar = (props) => {
  const { showSidebar, setShowSidebar } = props;

  return (
    <div className="fixed top-0 inset-x-0 z-20 p-4">
      <div
        className={`relative flex flex-col bg-clip-border rounded-xl shadow-md text-color 
        transition-all duration-500 ease-in-out h-14 bg-white ${showSidebar ? 'ml-64' : ''}`}
      >
        <div className="flex justify-between items-center h-full px-4">
          <Buttonz onClick={() => setShowSidebar(!showSidebar)} variant="text" color="black" className="p-1 text-color">
            <Bars3Icon className="h-8 w-8 stroke-1" />
          </Buttonz>
          <div className="flex gap-2 justify-between items-center mr-2">
            <NotifySection />
            <AvatarSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
