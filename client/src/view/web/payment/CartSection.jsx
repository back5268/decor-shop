import React, { useEffect, useState } from 'react';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useGetApi } from '@lib/react-query';
import { getListCartByUserApi } from '@api';
import { Buttonz } from '@components/core';
import PaymentSection from './PaymentSection';

const HeaderColumn = ({ children, className = '', ...prop }) => (
  <th className={`px-2 py-3 bg-blue-gray-50 font-medium text-center ${className}`} {...prop}>
    {children}
  </th>
);
const BodyColumn = ({ children, className = '', ...prop }) => (
  <td className={`p-2 text-xs text-center ${className}`} {...prop}>
    {children}
  </td>
);

const CartSection = () => {
  const { data: myCarts } = useGetApi(getListCartByUserApi, {}, 'myCarts');
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (myCarts?.length > 0) {
      const newProducts = [];
      myCarts.forEach((cart) => newProducts.push({ ...cart.product, time: cart.createdAt }));
    }
  }, [JSON.stringify(myCarts)]);

  return (
    <div>
      <PaymentSection open={open} setOpen={setOpen} />
      <div color="red" className="flex justify-end">
        <Buttonz onClick={() => setOpen(true)}>Thanh toán</Buttonz>
      </div>
      <div className="flex flex-col overflow-x-auto w-full">
        <div className="inline-block min-w-full py-2">
          <div className="overflow-x-auto overflow-y-hidden relative">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <HeaderColumn>#</HeaderColumn>
                  <HeaderColumn>Sản phẩm</HeaderColumn>
                  <HeaderColumn>Số lượng</HeaderColumn>
                  <HeaderColumn>Đơn giá</HeaderColumn>
                  <HeaderColumn>Thành tiền</HeaderColumn>
                  <HeaderColumn></HeaderColumn>
                </tr>
              </thead>
              <tbody>
                {products && products.length > 0 ? (
                  products.map((item, index) => {
                    return (
                      <tr key={index}>
                        <BodyColumn>1</BodyColumn>
                        <BodyColumn>2</BodyColumn>
                        <BodyColumn className="flex justify-center">
                          <div className="flex border-border">
                            <div className="border-border w-[64px]">
                              <Buttonz
                                disabled={item.quantity === 1}
                                onClick={() => setProducts(item.quantity - 1)}
                                variant="text"
                                color="gray"
                              >
                                <MinusIcon className="w-4" />
                              </Buttonz>
                            </div>
                            <div className="w-[96px] text-lg flex justify-center items-center">{item.quantity}</div>
                            <div className="border-border w-[64px]">
                              <Buttonz onClick={() => setProducts(item.quantity + 1)} variant="text" color="gray">
                                <PlusIcon className="w-4" />
                              </Buttonz>
                            </div>
                          </div>
                        </BodyColumn>
                        <BodyColumn>2</BodyColumn>
                        <BodyColumn>2</BodyColumn>
                        <BodyColumn>
                          <Buttonz color="red" variant="text" className="p-2">
                            <TrashIcon className="w-5" />
                          </Buttonz>
                        </BodyColumn>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <BodyColumn className="text-center py-4 !text-sm" colSpan={5}>
                      Không có dữ liệu
                    </BodyColumn>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSection;
