import React, { useState } from 'react';
import { formatNumber } from '@lib/helper';
import { Buttonz, Imagez } from '@components/core';
import { useProductState } from '@store';

const CardProduct = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setProductId } = useProductState();

  return (
    <>
      <div className="relative h-48 px-2 overflow-hidden" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <Imagez src={item.avatar} alt="Ảnh sản phẩm" className="h-full w-full" />
        <div className={`absolute rounded-md mx-2 inset-0 justify-center items-center group-hover:flex flex`}>
          {isHovered && <div className="absolute rounded-md inset-0 bg-black bg-opacity-20 opacity-30"></div>}
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
        <div className="mt-1 flex gap-2 text-lg">
          <span className="text-red-600">{formatNumber(item.price)} đ</span>
          <span className="text-red-600">{formatNumber(item.price - item.sale)} đ</span>
        </div>
      </div>
    </>
  );
};

export default CardProduct;
