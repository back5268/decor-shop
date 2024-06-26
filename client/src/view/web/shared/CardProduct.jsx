import React, { useState } from 'react';
import { formatNumber } from '@lib/helper';
import { Buttonz, Chipz, Imagez, Ratez } from '@components/core';
import { useProductState } from '@store';

const CardProduct = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setProductId } = useProductState();

  return (
    <>
      <div className="relative sm:h-48 h-32 px-2 overflow-hidden" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <Imagez src={item.avatar} alt="Ảnh sản phẩm" className="h-full w-full" />
        <div className={`absolute rounded-md mx-2 inset-0 justify-center items-center group-hover:flex flex`}>
          {isHovered && <div className="absolute rounded-md inset-0 bg-black bg-opacity-50 opacity-50"></div>}
          <div
            className={`font-medium z-10 duration-300 ease-in-out transform 
            ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            <Buttonz onClick={() => setProductId(item._id)} severity="secondary" label="Xem sản phẩm" />
          </div>
        </div>
      </div>
      <div className="mt-2 px-4 flex flex-col gap-1 font-medium">
        <h4 className="line-clamp-2">{item.name}</h4>
        <div className="mt-1 flex gap-3 sm:text-lg text-sm items-center">
          <span className="text-red-600 font-normal">{formatNumber(item.price - item.sale || 0)} đ</span>
          {item.sale && (
            <>
              <span className="text-gray-500 font-normal sm:text-sm text-xs line-through hidden sm:block">{formatNumber(item.price)} đ</span>
              <span className="py-1 px-2 text-xs text-red-500 rounded-lg   bg-red-100">-{Math.round((item.sale / item.price) * 100)}%</span>
            </>
          )}
        </div>
        <div className="flex items-center sm:gap-3 gap-2">
          <span className='text-red-500 sm:block hidden'>{item?.vote}</span> <Ratez value={item?.vote} />
          <span className="sm:text-sm text-xs font-normal">Đã bán {formatNumber(item.saleNumber) || 0}</span>
        </div>
      </div>
    </>
  );
};

export default CardProduct;
