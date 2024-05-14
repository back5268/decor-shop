import { Inputz } from '@components/core';
import React, { useEffect, useRef, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchSection = () => {
  const [value, setValue] = useState('');

  const ref = useRef(null);
  const [isShow, setIsShow] = useState(false);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) setIsShow(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (value) !isShow && setIsShow(true);
    else setIsShow(false);
  }, [value]);

  return (
    <div ref={ref} className="relative flex w-[400px] flex-wrap items-stretch text-sm">
      <Inputz
        classInput="text-border"
        size="md"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        label="Tìm kiếm sản phẩm"
        icon={<MagnifyingGlassIcon className="h-6 cursor-pointer hover:text-primary stroke-2 text-border" />}
        className="!w-full"
      />
      <div
        className={`absolute w-full right-0 mt-12 bg-white shadow-xl rounded-md transition-all z-50 
        duration-300 ease-in-out transform ${isShow ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}
      ></div>
    </div>
  );
};

export default SearchSection;
