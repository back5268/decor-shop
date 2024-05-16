import { Buttonz, Dropdownz, Hrz, Inputz } from '@components/core';
import { rates } from '@constant';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Filter = ({ params, setParams }) => {
  const location = useLocation();
  const [price, setPrice] = useState({});

  useEffect(() => {
    const query = {};
    const queryParams = new URLSearchParams(location.search);
    for (let [key, value] of queryParams.entries()) {
      if (['fromPrice', 'toPrice'].includes(key)) query[key] = Number(value);
    }
    setPrice(query);
  }, [location.search]);

  return (
    <div className="card !p-0 w-full">
      <div className="h-16 flex items-center justify-center">
        <h2 className="uppercase font-semibold">Bộ lọc tìm kiếm</h2>
      </div>
      <Hrz />
      <div className="text-left p-4 flex flex-col text-sm">
        <Dropdownz label="Đánh giá" className="!w-full !p-0" options={rates} />
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
          />
        </div>
        <Hrz />

        <Hrz />
        <Buttonz
          color="red"
          variant="outlined"
          onClick={() => setParams((pre) => ({ sort: pre.sort, page: pre.page, limit: pre.limit }))}
          className="w-full mt-4"
          label="Xóa tất cả"
        />
      </div>
    </div>
  );
};

export default Filter;
