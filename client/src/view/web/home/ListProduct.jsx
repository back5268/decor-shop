import React from 'react';
import { CardProduct, Title } from '../shared';
import { Buttonz } from '@components/core';
import { useNavigate } from 'react-router-dom';

const ListProduct = (props) => {
  const { label, data = [], route } = props
  const navigate = useNavigate()

  return (
    <div>
      <Title label={label} />
      <div className="card w-full mb-4">
        <div className="mt-4 flex">
          {data?.map((item, index) => {
            return (
              <div key={index} className="w-3/12">
                <CardProduct item={item} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex w-full justify-center">
        <Buttonz onClick={() => navigate(`/products${route}`)} label="Xem thêm" color="red" style={{ backgroundColor: '#a45909' }} />
      </div>
    </div>
  );
};

export default ListProduct;
