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
    <div className='sm:container mt-32 px-8'>
      <div className="w-full flex card sm:flex-row flex-col">
        <div className="sm:w-3/12 w-full sm:border-r-2 p-4 border-border">
          <div className="flex sm:flex-col flex-row gap-2">
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <ListItem
                  key={index}
                  onClick={() => setActiveTab(item.value)}
                  className={`w-full rounded-xl bg-blue-gray-50 p-3 text-sm font-medium text-color hover:bg-primary 
                hover:text-white focus:bg-primary focus:text-white ${activeTab === item.value ? 'bg-primary text-white' : ''}`}
                >
                  <ListItemPrefix className='sm:block hidden'>
                    <Icon className="h-5" />
                  </ListItemPrefix>
                  {item.label}
                </ListItem>
              );
            })}
          </div>
        </div>
        <div className="sm:w-9/12 w-full card">
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
    </div>
  );
}
