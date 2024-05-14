import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useProductState } from '@store';
import { Buttonz, Hrz } from '@components/core';

const ProductDialog = () => {
  const { product, setProduct } = useProductState();

  return (
    <div
      className={`fixed inset-x-0 inset-y-0 w-screen h-screen z-[52] flex justify-center items-center p-6 ${Boolean(product) ? '' : 'pointer-events-none'}`}
    >
      <div
        onClick={() => setProduct(null)}
        className={`duration-600 ease-in-out transform absolute w-full h-full bg-black bg-opacity-40 ${Boolean(product) ? 'opacity-100' : 'opacity-0'}`}
      ></div>
      <div
        className={`fixed right-0 inset-y-0 h-screen w-[400px] bg-white shadow-xl rounded-xl transition-all text-slate-500 px-6 py-4
          transform duration-500 ease-in-out z-[52] ${Boolean(product) ? '' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center">
          <h2 className="font-semibold uppercase leading-normal">Thông tin sản phẩm</h2>
          <Buttonz onClick={() => setProduct(null)} color="gray" variant="text" className="p-1 rounded-full mb-2">
            <XMarkIcon className="h-8 w-8 stroke-4" />
          </Buttonz>
        </div>
        <Hrz />
      </div>
    </div>
  );
};

export default ProductDialog;
