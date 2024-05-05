import { Buttonz, Imagez, Popoverz } from '@components/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const items = [{ label: 'Thông tin cá nhân' }];

const AvatarSection = () => {
  const userInfo = {};
  const navigate = useNavigate();

  return (
    <Popoverz
      className="p-0"
      header={
        <Imagez
          src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
          alt="Avatar"
        />
      }
    >
      <div className="flex flex-col justify-center items-center w-64">
        <div className="flex gap-4 h-24 items-center w-full">
          <Imagez
            h={'16'}
            w={'16'}
            src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
            alt="Avatar"
          />
          <div className="items-center text-left">
            <h4 className="font-medium mb-1">dasddsadsa</h4>
            <p className="text-sm">@dsadaasd</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 my-4 w-full">
          <Buttonz className="w-full">Chuyển đến trang chủ</Buttonz>
          <Buttonz variant="outlined" className="w-full">
            Đăng xuất
          </Buttonz>
        </div>
      </div>
    </Popoverz>
  );
};

export default AvatarSection;
