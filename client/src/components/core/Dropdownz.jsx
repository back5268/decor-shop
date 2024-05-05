import { Option, Select } from '@material-tailwind/react';
import React from 'react';

const Dropdownz = (props) => {
  const { id, value, size = 'lg', optionValue = 'id', optionLabel = 'name', errors = {}, options = [], className = '', ...prop } = props;

  return (
    <div className={`flex flex-col gap-1 w-full p-2 ${className}`}>
      <Select
        id={id}
        value={value ? String(value) : ""}
        size={size}
        color="light-blue"
        error={Boolean(errors[id])}
        className="rounded-md px-0"
        {...prop}
      >
        {options?.length > 0 ? (
          options.map((item) => {
            let key, text;
            if (typeof item === 'object') {
              key = String(item[optionValue]);
              text = String(item[optionLabel]);
            } else key = text = String(item);
            return (
              <Option key={key} value={key}>
                {text}
              </Option>
            );
          })
        ) : (
          <div className="cursor-default">Không có dữ liệu</div>
        )}
      </Select>
      {errors[id] && <small className="w-full ml-2 text-red-600">{errors[id].message}</small>}
    </div>
  );
};

export default Dropdownz;
