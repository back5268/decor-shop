import { Hrz, Imagez, Inputz } from '@components/core';
import React, { useEffect, useRef, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { getListProductWebApi } from '@api';
import { useGetApi } from '@lib/react-query';
import { ListItem } from '@material-tailwind/react';
import { useProductState } from '@store';

const SearchSection = () => {
  const { setProductId } = useProductState();
  const [value, setValue] = useState('');
  const { data } = useGetApi(getListProductWebApi, { keySearch: value, page: 1, limit: 5 }, 'search');

  const ref = useRef(null);
  const [isShow, setIsShow] = useState(false);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) setIsShow(false);
    else setIsShow(true);
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
    <div ref={ref} className="relative w-[400px] flex-wrap items-stretch text-sm lg:block hidden">
      <Inputz
        classInput="text-color"
        size="md"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        label="Tìm kiếm sản phẩm"
        icon={<MagnifyingGlassIcon className="h-6 cursor-pointer hover:text-primary stroke-2 text-color" />}
        className="!w-full"
      />
      <div
        className={`absolute w-full right-0 mt-1 bg-white shadow-xl rounded-md transition-all z-50
        duration-300 ease-in-out transform ${isShow ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col gap-1">
          {data?.length > 0 ? (
            data.map((item, index) => {
              return (
                <ListItem
                  onClick={() => setProductId(item._id)}
                  key={index}
                  className="hover:bg-blue-gray-50 rounded-md w-full flex gap-4 items-center p-2"
                >
                  <div className="w-16 h-16">
                    <Imagez src={item.avatar} className="w-16 h-16" />
                  </div>
                  <div>
                    <p>{item.name}</p>
                  </div>
                </ListItem>
              );
            })
          ) : (
            <div className="p-4">
              Không tìm thấy kết quả <Hrz />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
