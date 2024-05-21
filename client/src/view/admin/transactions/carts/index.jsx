import { getListCartApi } from '@api';
import { DataTable, FormList, TimeBody } from '@components/base';
import DataFilter from '@components/base/DataFilter';
import { Dropdownz, Hrz, Imagez } from '@components/core';
import { useGetParams } from '@hook';
import { formatNumber } from '@lib/helper';
import { useGetApi } from '@lib/react-query';
import { useDataState, useProductState } from '@store';
import React, { useState } from 'react';

const Carts = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { products } = useDataState();
  const { isLoading, data } = useGetApi(getListCartApi, params, 'carts');
  const { setProductId } = useProductState();

  const columns = [
    {
      label: 'Sản phẩm',
      body: (item) => {
        const e = item.product;
        return (
          <div className="flex gap-2 items-center">
            <div className="h-20 w-20 cursor-pointer" onClick={() => setProductId(e._id)}>
              <Imagez src={e.avatar} className="h-20 w-20" />
            </div>
            <div className="flex flex-col gap-2 text-left">
              <p>{e.name}</p>
              <p className="font-medium">#{e.code}</p>
            </div>
          </div>
        );
      },
      className: 'max-w-48'
    },
    { label: 'Đơn giá', body: (item) => formatNumber(item.product?.price - item.product?.sale || 0) },
    { label: 'Số lượng trong kho', body: (item) => formatNumber(item.product?.quantity) },
    { label: 'Người thêm', body: (item) => item.by?.name },
    { label: 'Thời gian thêm', body: (item) => TimeBody(item.createdAt) },
  ];

  return (
    <FormList title="Danh sách giỏ hàng">
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="md:w-6/12 lg:w-9/12">
        <Dropdownz
          value={filter.product}
          onChange={(e) => setFilter({ ...filter, product: e })}
          optionLabel="name"
          optionValue="_id"
          options={products}
          label="Sản phẩm"
        />
      </DataFilter>
      <Hrz />
      <DataTable isLoading={isLoading} data={data?.documents} total={data?.total} columns={columns} params={params} setParams={setParams} />
    </FormList>
  );
};

export default Carts;
