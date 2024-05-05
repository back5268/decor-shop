import { Buttonz } from '@components/core';
import { BellIcon } from '@heroicons/react/24/outline';
import React from 'react';

const NotifySection = () => {
  return (
    <Buttonz variant="text" color="black" className="p-2 text-color">
      <BellIcon className="h-6 w-6 stroke-1" />
    </Buttonz>
  );
};

export default NotifySection;
