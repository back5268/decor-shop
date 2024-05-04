import { Option, Select } from '@material-tailwind/react';
import React from 'react';

const Dropdownz = (props) => {
  const { id, value, label, optionValue = 'id', optionLabel = 'name', errors = {}, options = [], className, ...prop } = props;

  return (
    <div className={`flex flex-col gap-1 w-full p-2 ${className}`}>
      <Select id={id} size="lg" color="light-blue" label="Select Version" error={Boolean(errors[id])} className="rounded-[1px]" {...prop}>
        {options?.length > 0 ? (
          options.map((item) => {
            let key, text;
            if (typeof item === 'object') {
              key = item[optionValue];
              text = item[optionLabel];
            } else key = text = item;
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
