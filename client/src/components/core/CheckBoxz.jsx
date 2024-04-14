import { Checkbox } from '@components/ui/checkbox';
import React from 'react';

const CheckBoxz = (props) => {
  const { id, label, ...prop } = props;

  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} {...prop} />
      {label && (
        <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
    </div>
  );
};

export default CheckBoxz;
