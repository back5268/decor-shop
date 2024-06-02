import React, { useState } from 'react';
import { useGetApi } from '@lib/react-query';
import { cancelOrderApi, getListOrderByUserApi } from '@api';
import { Imagez } from '@components/core';
import DataTablePayment from './DataTablePayment';
import { useConfirmState, useToastState } from '@store';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Body } from '@components/base';
import { paymentStatus, paymentType } from '@constant';

const OrderSection = ({ status }) => {
  const { showConfirm } = useConfirmState();
  const [render, setRender] = useState(false);
  const [params, setParams] = useState({ page: 1, limit: 10 });
  const { data, isLoading } = useGetApi(getListOrderByUserApi, { ...params, render, status }, 'myOrder');
  const { showToast } = useToastState();

  const onDelete = (item) => {
    showConfirm({
      title: 'Bạn có chắc chắn muốn hủy đơn hàng!',
      action: async () => {
        const response = await cancelOrderApi({ _id: item._id });
        if (response) {
          showToast({ title: 'Hủy đơn hàng thành công!', severity: 'success' });
          setRender(!render);
        }
      }
    });
  };

  const columns = [
    {
      label: 'Thông tin sản phẩm',
      body: (e) => (
        <div className="flex flex-col gap-1">
          {e.productInfo?.map((product, index) => (
            <div key={index} className="flex gap-2 items-center">
              <div className="h-20 w-20 cursor-pointer" onClick={() => setProductId(e._id)}>
                <Imagez src={product.avatar} className="h-20 w-20" />
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
    { label: 'Mã QR', body: (e) => (e.qrCode ? <Imagez isZoom className="w-20 h-20" src={e.qrCode} /> : '') },
    { label: 'Trạng thái', body: (e) => Body(paymentStatus, e.status) }
  ];

  return (
    <DataTablePayment
      loading={isLoading}
      data={data?.documents}
      total={data?.total}
      params={params}
      setParams={setParams}
      columns={columns}
      moreActions={[
        {
          color: 'red',
          icon: XMarkIcon,
          onClick: (item) => onDelete(item),
          condition: (item) => item.status !== 5
        }
      ]}
    />
  );
};

export default OrderSection;
