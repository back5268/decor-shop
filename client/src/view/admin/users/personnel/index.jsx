import { deleteUserApi, getListUserApi, updateUserApi } from '@api';
import { DataTable, FormList } from '@components/base';
import DataFilter from '@components/base/DataFilter';
import { Dropdownz, Inputz } from '@components/core';
import { statuses } from '@constant';
import { useAuthContext } from '@context/AuthContext';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import DetailUser from './Detail';

const Personnel = () => {
  const { userInfo, setUserInfo } = useAuthContext();
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const [show, setShow] = useState(false);
  const { isLoading, data } = useGetApi(getListUserApi, { ...params, type: 'user' }, 'personel');

  const columns = [
    { label: 'Họ tên', field: 'fullName' },
    { label: 'Tài khoản', field: 'username' },
    { label: 'Email', field: 'email' },
    { label: 'Thời gian tạo', body: (item) => TimeBody(item.createdAt) },
    { label: 'Thời gian cập nhật', body: (item) => TimeBody(item.updatedAt) }
  ];

  const onSuccess = async (item) => {
    if (item._id === userInfo._id) {
      const response = await getInfoApi();
      if (response) {
        setUserInfo(response);
      } else localStorage.removeItem('token');
    }
  };

  return (
    <FormList title="Danh sách nhân viên">
      <DetailUser show={show} setShow={setShow} setParams={setParams} data={data?.documents} />
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter}>
        <Inputz
          value={filter.keySearch}
          onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
          label="Tìm kiếm theo tên, tài khoản"
          className="w-full lg:w-3/12"
        />
        <Inputz
          value={filter.email}
          onChange={(e) => setFilter({ ...filter, email: e.target.value })}
          label="Tìm kiếm theo email"
          className="w-full lg:w-3/12"
        />
        <Dropdownz
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e })}
          options={statuses}
          label="Trạng thái"
          className="w-full lg:w-3/12"
        />
      </DataFilter>
      <hr className="mt-2 border-t-2" />
      <DataTable
        isLoading={isLoading}
        title="Danh sách nhân sự"
        data={data?.documents}
        totalRecord={data?.total}
        columns={columns}
        params={params}
        setParams={setParams}
        baseActions={['insert', 'detail', 'delete']}
        setShow={setShow}
        actionsInfo={{ onViewDetail: (item) => setShow(item._id), deleteApi: deleteUserApi }}
        statusInfo={{ changeStatusApi: updateUserApi }}
        headerInfo={{ onInsert: () => setShow(true) }}
        onSuccess={onSuccess}
      />
    </FormList>
  );
};

export default Personnel;
