import { Input } from '@material-tailwind/react';
import React from 'react';

const Inputz = (props) => {
  const { id, value = '', onChange = () => {}, size = 'lg', color = 'cyan', errors = {}, register = () => {}, className, ...prop } = props;

  return (
    <div className={`flex flex-col gap-1 w-full p-2 ${className}`}>
      <Input color={color} autoComplete={id} size={size} id={id} value={value} onChange={onChange} error={Boolean(errors[id])} {...register} {...prop} />
      {errors[id] && <small className="w-full ml-2 text-red-600">{errors[id].message}</small>}
    </div>
  );
};

export default Inputz;
