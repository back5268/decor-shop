import { Input } from '@material-tailwind/react';
import React from 'react';

const Inputz = (props) => {
  const { id, value, label, errors = {}, register = () => {}, className, ...prop } = props;

  return (
    <div className={`flex flex-col gap-1 w-full p-2 ${className}`}>
      <Input autoComplete={id} size="lg" color="cyan" id={id} label={label} {...register(id)} error={Boolean(errors[id])} {...prop} />
      {errors[id] && <small className="w-full ml-2 text-red-600">{errors[id].message}</small>}
    </div>
  );
};

export default Inputz;
