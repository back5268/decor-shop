import { deleteProductApi, getListProductApi, updateProductApi } from '@api';
import { Body, DataTable, FormList, NumberBody, TimeBody } from '@components/base';
import DataFilter from '@components/base/DataFilter';
import { Dropdownz, Hrz, Inputz } from '@components/core';
import { statuses, productType } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListProductApi, params, 'products');

  const columns = [
    { label: 'Tên sản phẩm', field: 'name' },
    { label: 'Mã sản phẩm', field: 'code' },
    { label: 'Loại sản phẩm', body: (item) => Body(productType, item.type) },
    { label: 'Giá bán ra', body: (item) => NumberBody(item.price) },
    { label: 'Đánh giá', body: (item) => NumberBody(item.vote) },
    { label: 'Số lượng trong kho', body: (item) => NumberBody(item.quantity) },
    { label: 'Thời gian tạo', body: (item) => TimeBody(item.createdAt) }
  ];

  return (
    <FormList title="Danh sách sản phẩm">
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="md:w-6/12">
        <Inputz
          value={filter.keySearch}
          onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
          label="Tìm kiếm theo tên, mã sản phẩm"
        />
        <Dropdownz value={filter.type} onChange={(e) => setFilter({ ...filter, type: e })} options={productType} label="Loại sản phẩm" />
        <Dropdownz value={filter.status} onChange={(e) => setFilter({ ...filter, status: e })} options={statuses} label="Trạng thái" />
      </DataFilter>
      <Hrz />
      <DataTable
        isLoading={isLoading}
        data={data?.documents}
        total={data?.total}
        columns={columns}
        params={params}
        setParams={setParams}
        baseActions={['create', 'detail', 'delete']}
        actionsInfo={{ onViewDetail: (item) => navigate(`/admin/products/detail/${item._id}`), deleteApi: deleteProductApi }}
        statusInfo={{ changeStatusApi: updateProductApi }}
        headerInfo={{ onCreate: () => navigate('/admin/products/create') }}
      />
    </FormList>
  );
};

export default Products;
