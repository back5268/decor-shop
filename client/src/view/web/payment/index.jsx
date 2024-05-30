import React, { useState } from 'react';
import { ListItem, ListItemPrefix } from '@material-tailwind/react';
import { ShoppingBagIcon, ShoppingCartIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';
import CartSection from './CartSection';
import OrderSection from './OrderSection';

export default function UnderlineTabs() {
  const [activeTab, setActiveTab] = useState('cart');

  const items = [
    { label: 'Giỏ hàng', icon: ShoppingCartIcon, value: 'cart' },
    { label: 'Đơn hàng đã đặt', icon: ShoppingBagIcon, value: 'order' },
    { label: 'Đơn hàng chờ thanh toán', icon: ArchiveBoxIcon, value: 'payment' },
    { label: 'Đơn hàng đang giao', icon: ArchiveBoxIcon, value: 'pending' },
    { label: 'Đơn hàng đã hủy', icon: ArchiveBoxIcon, value: 'cancel' }
  ];

  return (
    <div className="container flex card mt-32">
      <div className="w-3/12 border-r-2 p-4 border-border">
        <div className="flex flex-col gap-2">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <ListItem
                key={index}
                onClick={() => setActiveTab(item.value)}
                className={`rounded-xl bg-blue-gray-50 p-3 text-sm font-medium text-color hover:bg-primary 
                hover:text-white focus:bg-primary focus:text-white ${activeTab === item.value ? 'bg-primary text-white' : ''}`}
              >
                <ListItemPrefix>
                  <Icon className="h-5" />
                </ListItemPrefix>
                {item.label}
              </ListItem>
            );
          })}
        </div>
      </div>
      <div className="w-9/12 card m-4">
        {activeTab === 'cart' ? (
          <CartSection />
        ) : activeTab === 'order' ? (
          <OrderSection />
        ) : activeTab === 'payment' ? (
          <OrderSection status={1} />
        ) : activeTab === 'pending' ? (
          <OrderSection status={3} />
        ) : (
          <OrderSection status={5} />
        )}
      </div>
    </div>
  );
}
