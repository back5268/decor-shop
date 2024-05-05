import { DataTable, FormList } from '@components/base';
import DataFilter from '@components/base/DataFilter';
import { Dropdownz, Inputz } from '@components/core';
import React, { useState } from 'react';

const Users = () => {
  const [params, setParams] = useState({});
  const [filter, setFilter] = useState({});

  const columns = [
    { label: 'Họ tên', field: 'fullName' },
    { label: 'Username', field: 'username' },
    { label: 'Email', field: 'email' },
    { label: 'Thời gian tạo', body: (item) => TimeBody(item.createdAt) },
    { label: 'Thời gian cập nhật', body: (item) => TimeBody(item.updatedAt) }
  ];

  return (
    <FormList title="Danh sách nhân viên">
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-6/12">
        <Inputz label="Tìm kiếm theo tài khoản" className="w-full lg:w-3/12" />
        <Dropdownz className="w-full lg:w-3/12" />
      </DataFilter>
      <hr className="mt-2 border-t-2" />
      <DataTable
        title="Quản lý người dùng"
        columns={columns}
        params={params}
        setParams={setParams}
        baseActions={['insert', 'detail', 'delete']}
      />
    </FormList>
  );
};

export default Users;
