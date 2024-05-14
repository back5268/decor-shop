import React, { useState } from 'react';
import { formatNumber } from '@lib/helper';
import { Buttonz } from '@components/core';
import { useProductState } from '@store';

const CardProduct = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setProduct } = useProductState();

  return (
    <>
      <div className="relative h-48 px-2 overflow-hidden" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="h-full flex justify-center items-center">
          <div
            className="relative h-full w-full rounded-lg bg-cover bg-slate-100"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80')`
            }}
          ></div>
        </div>
        <div className={`absolute rounded-md mx-2 inset-0 justify-center items-center group-hover:flex flex`}>
          {isHovered && <div className="absolute rounded-md inset-0 bg-black bg-opacity-10 opacity-30"></div>}
          <div
            className={`font-medium z-10 duration-300 ease-in-out transform 
            ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            <Buttonz onClick={() => setProduct(1)} severity="secondary" label="Xem sản phẩm" />
          </div>
        </div>
      </div>
      <div className="mt-2 px-4 flex flex-col gap-1 font-medium">
        <h4 className="line-clamp-2">Đèn ngủ trang trí</h4>
        <div className="mt-1 flex gap-2 text-lg">
          <span className="text-red-600">{formatNumber(50000)} đ</span>
        </div>
      </div>
    </>
  );
};

export default CardProduct;
