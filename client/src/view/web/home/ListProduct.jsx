import React from 'react';
import { CardProduct, Title } from '../shared';
import { Buttonz } from '@components/core';

const ListProduct = () => {
  const items = ['', '', '', ''];
  return (
    <div className="">
      <Title label="Sản phẩm bán chạy" />
      <div className="card w-full mb-4">
        <div className="mt-4 flex">
          {items.map((item, index) => {
            return (
              <div key={index} className="w-full lg:w-3/12">
                <CardProduct item={item} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex w-full justify-center">
        <Buttonz label="Xem thêm" color="red" />
      </div>
    </div>
  );
};

export default ListProduct;
