import React, { useEffect, useState } from 'react';
import { useGetApi } from '@lib/react-query';
import { deleteCartApi, getListCartByUserApi } from '@api';
import { Buttonz, Imagez } from '@components/core';
import PaymentSection from './PaymentSection';
import DataTablePayment from './DataTablePayment';
import { formatNumber } from '@lib/helper';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useConfirmState, useProductState, useToastState } from '@store';
import { TrashIcon } from '@heroicons/react/24/outline';

const CartSection = () => {
  const { showConfirm } = useConfirmState();
  const [render, setRender] = useState(false);
  const { data: myCarts } = useGetApi(getListCartByUserApi, { render }, 'myCarts');
  const { setProductId } = useProductState();
  const [products, setProducts] = useState([]);
  const [select, setSelect] = useState([]);
  const [open, setOpen] = useState(false);
  const { showToast } = useToastState();

  useEffect(() => {
    const newProducts = [];
    myCarts?.forEach((cart) => newProducts.push({ ...cart.product, cartId: cart._id, time: cart.createdAt, number: 1 }));
    setProducts(newProducts);
  }, [JSON.stringify(myCarts)]);

  const onDelete = (item) => {
    showConfirm({
      title: 'Bạn có chắc chắn muốn xóa sản phẩm khỏi giỏ hàng!',
      action: async () => {
        const response = await deleteCartApi({ _id: item.cartId });
        if (response) {
          showToast({ title: 'Xóa sản phẩm thành công!', severity: 'success' });
          setRender(!render);
        }
      }
    });
  };

  const columns = [
    {
      label: 'Sản phẩm',
      body: (e) => (
        <div className="flex gap-2 items-center">
          <div className="h-20 w-20 cursor-pointer" onClick={() => setProductId(e._id)}>
            <Imagez src={e.avatar} className="h-20 w-20" />
          </div>
          <div className="flex flex-col gap-2 text-left">
            <span>{e.name}</span>
            <span className="font-medium">#{e.code}</span>
          </div>
        </div>
      ),
      className: 'max-w-48'
    },
    {
      label: 'Số lượng',
      body: (e) => {
        return (
          <div className="flex flex-col gap-1 justify-center">
            <div className="flex w-full items-center justify-center">
              <Buttonz
                disabled={e.number <= 1}
                onClick={() => setProducts((pre) => pre.map((p) => (p._id === e._id ? { ...p, number: p.number - 1 } : p)))}
                variant="text"
                color="gray"
                className="!py-2 !px-4"
              >
                <MinusIcon className="w-5" />
              </Buttonz>
              <div className="w-12">
                <span>{e.number}</span>
              </div>
              <Buttonz
                disabled={e.number >= e.quantity}
                onClick={() => setProducts((pre) => pre.map((p) => (p._id === e._id ? { ...p, number: p.number + 1 } : p)))}
                variant="text"
                color="gray"
                className="!py-2 !px-4"
              >
                <PlusIcon className="w-5" />
              </Buttonz>
            </div>
            <span>Có sẵn {e.quantity} sản phẩm</span>
          </div>
        );
      }
    },
    { label: 'Đơn giá', body: (e) => formatNumber(e.price - e.sale || 0) },
    { label: 'Thành tiền', body: (e) => formatNumber((e.price - e.sale) * e.number) }
  ];

  return (
    <div>
      <PaymentSection products={products.filter((p) => select.includes(p._id))} open={open} setOpen={setOpen} />
      <div color="red" className="flex justify-end mb-2">
        <Buttonz
        style={{ backgroundColor: '#ff7c08' }}
          onClick={() =>
            select?.length > 0 ? setOpen(true) : showToast({ title: 'Vui lòng chọn sản phẩm trước khi thanh toán', severity: 'warning' })
          }
        >
          Thanh toán
        </Buttonz>
      </div>
      <DataTablePayment
        data={products}
        columns={columns}
        select={select}
        setSelect={setSelect}
        moreActions={[
          {
            color: 'red',
            icon: TrashIcon,
            onClick: (item) => onDelete(item)
          }
        ]}
      />
    </div>
  );
};

export default CartSection;
