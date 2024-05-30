import React, { useState } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { Buttonz, Cardz, Linkz } from '@components/core';
import { ListItem } from '@material-tailwind/react';

const Menuz = ({ label, items, select }) => {
  const [isHovered, setIsHovered] = useState(false);
  const active = items.find((item) => item.route === select) || isHovered;

  return (
    <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Buttonz
        variant="text"
        color="white"
        className={`!py-2 !px-3 transition-all duration-300 ease-in-out text-color 
        font-medium text-base !normal-case !bg-none ${active ? 'bg-blue-gray-50' : ''}`}
      >
        <div className="flex items-center gap-2">
          <span>{label}</span>
          <ChevronUpIcon className={`h-5 stroke-4 duration-300 ease-in-out transform ${isHovered ? 'rotate-180' : ''}`} />
        </div>
      </Buttonz>
      <div
        className={`absolute duration-300 ease-in-out transform ${isHovered ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}
      >
        <Cardz className="mt-4 rounded-lg py-2 min-w-48">
          {items?.map((item, index) => (
            <Linkz key={index} to={item.route}>
              <ListItem
                className={`p-3 transition-all duration-300 ease-in-out !text-color font-medium 
                text-base text-nowrap hover:!bg-blue-gray-50 ${select === item.route ? '!bg-blue-gray-50' : ''}`}
              >
                {item.label}
              </ListItem>
            </Linkz>
          ))}
        </Cardz>
      </div>
    </div>
  );
};

export default Menuz;
