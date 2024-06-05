import { completeOrderApi, getListOrderApi } from '@api';
import { Body, DataTable, FormList } from '@components/base';
import DataFilter from '@components/base/DataFilter';
import { Dropdownz, Hrz, Imagez } from '@components/core';
import { paymentStatus, paymentType } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { useProductState, useToastState } from '@store';
import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import DetailOrder from './Detail';

const Orders = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListOrderApi, params, 'orders');
  const { setProductId } = useProductState();
  const { showToast } = useToastState();

  const columns = [
    {
      label: 'Thông tin sản phẩm',
      body: (e) => (
        <div className="flex flex-col gap-1">
          {e.productInfo?.map((product, index) => (
            <div key={index} className="flex gap-2 items-center">
              <div className="h-20 w-20 cursor-pointer">
                <Imagez src={product.avatar} className="h-20 w-20" onClick={() => setProductId(product._id)} />
              </div>
              <div className="flex flex-col gap-2 text-left">
                <p>{product.name}</p>
                <p className="font-medium">#{product.code}</p>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      label: 'Thông tin nhận hàng',
      body: (e) => {
        const a = e.customerInfo;
        if (a)
          return (
            <div className="flex flex-col gap-2">
              <p>Tên: {a.name}</p>
              <p>Số điện thoại: {a.phone}</p>
              <p>
                Địa chỉ: {a.city}, {a.district}, {a.ward}
              </p>
            </div>
          );
      }
    },
    { label: 'Hình thức thanh toán', body: (e) => Body(paymentType, e.type) },
    { label: 'Mã giao dịch', field: "transactionCode" },
    {
      label: 'Mã QR',
      body: (e) =>
        e.qrCode ? (
          <div className="w-full flex justify-center">
            <Imagez isZoom className="w-20 h-20" src={e.qrCode} />
          </div>
        ) : (
          ''
        )
    },
    { label: 'Trạng thái', body: (e) => Body(paymentStatus, e.status), className: 'min-w-[150px]' }
  ];

  const onComplete = async (_id) => {
    const response = await completeOrderApi({ _id });
    if (response) {
      showToast({ title: 'Xác nhận đơn hàng thành công', severity: 'success' });
      setParams((prem) => ({ ...prem, render: !prem.render }));
    }
  };

  return (
    <FormList title="Danh sách đơn hàng">
      <DetailOrder open={open} setOpen={setOpen} setParams={setParams} />
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="md:w-6/12 lg:w-9/12">
        <Dropdownz value={filter.status} onChange={(e) => setFilter({ ...filter, status: e })} options={paymentStatus} label="Trạng thái" />
      </DataFilter>
      <Hrz />
      <DataTable
        isLoading={isLoading}
        data={data?.documents}
        total={data?.total}
        columns={columns}
        params={params}
        setParams={setParams}
        actionsInfo={{
          moreActions: [
            {
              icon: CheckIcon,
              onClick: (item) => setOpen(item._id),
              condition: (item) => item.status === 1
            },
            {
              icon: CheckIcon,
              onClick: (item) => onComplete(item._id),
              condition: (item) => item.status === 2
            }
          ]
        }}
      />
    </FormList>
  );
};

export default Orders;
