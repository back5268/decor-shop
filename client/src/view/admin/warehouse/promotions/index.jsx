import { deletePromotionApi, getListPromotionApi, updatePromotionApi } from '@api';
import { DataTable, FormList, TimeBody } from '@components/base';
import DataFilter from '@components/base/DataFilter';
import { Dropdownz, Hrz, Inputz } from '@components/core';
import { statuses, amountType } from '@constant';
import { useGetParams } from '@hook';
import { formatNumber } from '@lib/helper';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Promotions = () => {
  const navigate = useNavigate();
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListPromotionApi, params, 'promotions');

  const columns = [
    { label: 'Tiêu đề', field: 'title' },
    { label: 'Mã khuyến mãi', field: 'code' },
    {
      label: 'Giá trị khuyến mãi',
      body: (item) => (
        <div className="text-center">
          {formatNumber(item.amount)} {amountType.find((a) => a.key === item.amountType)?.label}
        </div>
      )
    },
    {
      label: 'Thời gian áp dụng',
      body: (item) => {
        return (
          <div className="flex flex-col gap-1 justify-center items-center">
            {TimeBody(item.start)}
            <span>đến</span>
            {TimeBody(item.end)}
          </div>
        );
      }
    },
    { label: 'Thời gian tạo', body: (item) => TimeBody(item.createdAt) },
    { label: 'Thời gian cập nhật', body: (item) => TimeBody(item.updatedAt) }
  ];

  return (
    <FormList title="Danh sách khuyến mãi">
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-6/12">
        <Inputz
          value={filter.keySearch}
          onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
          label="Tìm kiếm theo tiêu đề, mã"
        />
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
        actionsInfo={{ onViewDetail: (item) => navigate(`/admin/promotions/detail/${item._id}`), deleteApi: deletePromotionApi }}
        statusInfo={{ changeStatusApi: updatePromotionApi }}
        headerInfo={{ onCreate: () => navigate('/admin/promotions/create') }}
      />
    </FormList>
  );
};

export default Promotions;
