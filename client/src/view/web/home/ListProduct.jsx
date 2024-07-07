import React from 'react';
import { CardProduct, Title } from '../shared';
import { Buttonz } from '@components/core';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ListProduct = (props) => {
  const { label, data = [], route } = props;
  const navigate = useNavigate();

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
      <motion.div
        initial={{ y: 12, opacity: 0.5 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex w-full justify-center"
      >
        <Buttonz onClick={() => navigate(`/products${route}`)} label="Xem thêm" color="red" style={{ backgroundColor: '#ff7c08' }} />
      </motion.div>
    </div>
  );
};

export default ListProduct;
