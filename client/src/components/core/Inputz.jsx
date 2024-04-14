import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import React from 'react';

const Inputz = (props) => {
  const { id, label = '', placeholder, className, errors = {}, register = () => {}, ...prop } = props;
  return (
    <div className={`grid w-full items-center gap-2 ${className}`}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        id={id}
        placeholder={placeholder || `Vui lòng nhập ${label.toLowerCase()}`}
        {...register(id)}
        className={errors[id] && 'border-red-500'}
        {...prop}
      />
      {errors[id] && <span className="text-xs ml-2 text-red-500">{errors[id].message}</span>}
    </div>
  );
};

export default Inputz;
