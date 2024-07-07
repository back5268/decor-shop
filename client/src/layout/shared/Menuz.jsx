import React, { useState } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { Buttonz, Cardz, Linkz } from '@components/core';
import { ListItem } from '@material-tailwind/react';

const Menuz = ({ label, items, select, hover }) => {
  const [isHovered, setIsHovered] = useState(false);
  const active = items.find((item) => item.route === select) || isHovered;

  return (
    <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div
        className={`!py-2 !px-3 text-nowrap relative cursor-pointer transition-all duration-300 ease-in-out text-color text-lg 
        font-medium !normal-case !bg-none hover:text-[#ff7c08] ${active ? 'text-[#ff7c08]' : ''}`}
      >
        <div className={`absolute w-10/12 bg-[#ff7c08] h-[2px] rounded-sm top-12 opacity-0 transition-all duration-300 ease-in-out ${isHovered ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'}`}></div>
        <div className="flex items-center gap-2">
          <span>{label}</span>
          <ChevronUpIcon className={`h-5 stroke-4 duration-300 ease-in-out transform ${isHovered ? 'rotate-180' : ''}`} />
        </div>
      </div>
      <div
        className={`absolute duration-300 ease-in-out transform ${isHovered ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}
      >
        <Cardz className="mt-4 rounded-lg py-2 min-w-48">
          {items?.map((item, index) => (
            <Linkz key={index} to={item.route}>
              <div
                className={`p-3 transition-all duration-300 ease-in-out !text-color font-medium 
                text-base text-nowrap hover:!text-[#ff7c08] ${select === item.route ? '!text-[#ff7c08]' : ''}`}
              >
                {item.label}
              </div>
            </Linkz>
          ))}
        </Cardz>
      </div>
    </div>
  );
};

export default Menuz;
