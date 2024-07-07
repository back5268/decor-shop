import { Buttonz, Dropdownz, Hrz, Inputz } from '@components/core';
import { rates } from '@constant';
import React, { useState } from 'react';

const Filter = ({ params, setParams }) => {
  const [price, setPrice] = useState({});

  return (
    <div className="card !p-0 w-full">
      <div className="h-16 flex items-center justify-center">
        <h2 className="uppercase font-semibold">Bộ lọc tìm kiếm</h2>
      </div>
      <Hrz />
      <div className="text-left p-4 flex flex-col text-sm">
        <Dropdownz
          label="Đánh giá"
          className="!w-full !p-0"
          value={params.vote}
          onChange={(e) => setParams({ ...params, vote: e })}
          options={rates}
        />
        <div className="my-4 flex flex-col">
          <h4>Khoảng giá:</h4>
          <div className="flex items-center my-2">
            <Inputz
              type="number"
              size="md"
              className="!w-5/12 !p-0"
              label="Giá từ"
              value={price.fromPrice}
              onChange={(e) => setPrice({ ...price, fromPrice: e.target.value })}
            />
            <div className="w-2/12 text-center">---</div>
            <Inputz
              type="number"
              size="md"
              className="!w-5/12 !p-0"
              label="Giá đến"
              value={price.toPrice}
              onChange={(e) => setPrice({ ...price, toPrice: e.target.value })}
            />
          </div>
          <Buttonz
            onClick={() => {
              setParams({ ...params, ...price });
            }}
            className="w-full"
            label="Áp dụng"
            style={{ backgroundColor: '#ff7c08' }}
          />
        </div>
        <Hrz />

        <Hrz />
        <Buttonz
          color="red"
          variant="outlined"
          onClick={() => {
            setParams((pre) => ({ sort: pre.sort, page: pre.page, limit: pre.limit }));
            setPrice({});
          }}
          className="w-full mt-4"
          label="Xóa tất cả"
        />
      </div>
    </div>
  );
};

export default Filter;
