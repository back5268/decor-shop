import { Cardz } from '@components/core';
import React from 'react';

const FormList = (props) => {
  const { title, children, ...prop } = props;

  return (
    <Cardz className="p-4">
      <h2 className="font-semibold uppercase leading-normal">{title}</h2>
      <hr className='mt-2 border-t-2' />
      {children}
    </Cardz>
  );
};

export default FormList;
