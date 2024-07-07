import React, { useState } from 'react';
import { formatNumber } from '@lib/helper';
import { Buttonz, Cardz, Chipz, Imagez, Ratez } from '@components/core';
import { useProductState } from '@store';
import { motion } from 'framer-motion';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const CardProduct = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setProductId } = useProductState();

  return (
    <motion.div
      initial={{ y: 12, opacity: 0.5 }}
      whileInView={{ y: isHovered ? -24 : 0, opacity: 1 }}
      transition={{ duration: 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setProductId(item._id)}
      className={`relative rounded-xl bg-white shadow-md text-color transition-all duration-500 my-4
        ease-in-out mx-2 ${isHovered ? 'translate-y-[-12px]' : ''} cursor-pointer`}
    >
      <div className={`absolute rounded-md inset-0 justify-center items-center group-hover:flex flex`}>
        {isHovered && <div className="absolute inset-0 rounded-xl bg-black bg-opacity-50 opacity-50 z-[5]"></div>}
        <div
          className={`font-medium z-10 duration-300 ease-in-out transform 
            ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        ></div>
      </div>
      <div className="relative sm:h-64 h-32 overflow-hidden">
        <Imagez
          src={item.avatar}
          alt="Ảnh sản phẩm"
          className={`h-full w-full transition-transform duration-500 ease-in-out transform ${isHovered ? 'scale-105' : ''}`}
        />
      </div>
      <div className="mt-2 px-4 flex flex-col gap-1 font-medium">
        <div className="min-h-12">
          <h4 className="line-clamp-2">{item.name}</h4>
        </div>
        <div className="mt-1 flex gap-3 sm:text-lg text-sm items-center">
          <span className="text-[#ff7c08] font-normal">{formatNumber(item.price - item.sale || 0)} đ</span>
          {item.sale && (
            <>
              <span className="text-gray-500 font-normal sm:text-sm text-xs line-through hidden sm:block">
                {formatNumber(item.price)} đ
              </span>
              <span className="py-1 px-2 text-xs text-[#ff7c08] rounded-lg bg-[#ff7c08]/10">-{Math.round((item.sale / item.price) * 100)}%</span>
            </>
          )}
        </div>
        <div className="flex items-center sm:gap-3 gap-2">
          <span className="text-[#ff7c08] sm:block hidden">{item?.vote}</span> <Ratez value={item?.vote} />
          <span className="sm:text-sm text-xs font-normal">Đã bán {formatNumber(item.saleNumber) || 0}</span>
        </div>
      </div>
      <div className="flex justify-end">
        <Buttonz color="red" className="my-8" style={{ background: '#ff7c08' }} >
          <div className="flex gap-2 items-center">
            <ShoppingCartIcon className="w-5 stroke-2" />
            Thêm vào giỏ hàng
          </div>
        </Buttonz>
      </div>
    </motion.div>
  );
};

export default CardProduct;
