import { getListTransactionApi } from '@api';
import { Body, DataTable, FormList, TimeBody } from '@components/base';
import DataFilter from '@components/base/DataFilter';
import { Hrz, InputCalendarz } from '@components/core';
import { paymentStatus } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';

const Transactions = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListTransactionApi, params, 'transactions');

  const columns = [
    { label: 'Tiêu đề mẫu thông báo', field: 'subject' },
    { label: 'Tiêu đề mẫu thông báo', field: 'subject' },
    { label: 'Trạng thái', body: (item) => Body(paymentStatus, item.status) },
    { label: 'Thời gian tạo', body: (item) => TimeBody(item.createdAt) },
    { label: 'Thời gian cập nhật', body: (item) => TimeBody(item.updatedAt) }
  ];

  return (
    <FormList title="Lịch sử giao dịch">
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-6/12">
        <InputCalendarz value={filter.fromDate} onChange={(e) => setFilter({ ...filter, fromDate: e })} label="Từ ngày" />
        <InputCalendarz value={filter.toDate} onChange={(e) => setFilter({ ...filter, toDate: e })} label="Đến ngày" />
      </DataFilter>
      <Hrz />
      <DataTable isLoading={isLoading} data={data?.documents} total={data?.total} columns={columns} params={params} setParams={setParams} />
    </FormList>
  );
};

export default Transactions;
