import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { getListProductWebApi } from '@api';
import { Dropdownz, Hrz, Paginationz } from '@components/core';
import { useParams } from 'react-router-dom';
import { CardProduct } from '../shared';
import { orderBy, orderType } from '@constant';

const WebCourses = () => {
  const { slug } = useParams();
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [sort, setSort] = useState({ orderBy: 'createdAt', orderType: '-1' });
  const label = slug === 'diy-night-light' ? 'Đèn ngủ DIY' : slug === '3d-night-light' ? 'Đèn ngủ 3D' : 'Trang DIY';
  const type = slug === 'diy-night-light' ? 'diy' : slug === '3d-night-light' ? '3d' : 't-diy';
  const { data } = useGetApi(getListProductWebApi, { ...params, page: 1, limit: 100, type }, 'products');

  useEffect(() => {
    if (sort?.orderBy && sort?.orderType) {
      const object = {};
      object[sort.orderBy] = sort.orderType;
      setParams({ ...params, sort: object });
    }
  }, [sort?.orderBy, sort?.orderType]);

  return (
    <div className="container flex mt-24">
      <div className="hidden w-[400px] p-4 lg:block">
        <Filter params={params} setParams={setParams} />
      </div>
      <div className="w-full min-h-screen p-4">
        <div className="card !p-0">
          <div className="flex justify-between items-center">
            <h2 className="uppercase font-semibold text-nowrap ml-4 h-16 items-center flex">{label}</h2>
            <div className="hidden lg:flex h-16 gap-2 items-center p-4 w-full justify-end">
              <h4>Sắp xếp theo:</h4>
              <Dropdownz options={orderBy} value={sort?.orderBy} onChange={e => setSort({ ...sort, orderBy: e })} label="giá trị" />
              <Dropdownz options={orderType} value={sort?.orderType} onChange={e => setSort({ ...sort, orderType: e })} label="Kiểu" />
            </div>
          </div>
          <Hrz />
          <div className="p-4 flex flex-wrap">
            {data?.data?.length > 0 ? (
              data.data.map((item, index) => {
                return (
                  <div key={index} className="w-4/12 py-2">
                    <CardProduct item={item} />
                  </div>
                );
              })
            ) : (
              <div className="p-4 font-medium text-lg">Chưa có sản phẩm nào được tạo!</div>
            )}
          </div>
          <Hrz />
          <div className="lg:flex justify-center my-4 sm:block hidden">
            <Paginationz totalRecord={data?.total} params={params} setParams={setParams} rows={[10, 20, 50]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebCourses;
