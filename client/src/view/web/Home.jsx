import { Buttonz, Linkz } from '@components/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen w-screen">
      <Buttonz onClick={() => navigate('/admin')} label="Chuyển đến trang admin" />
      <Buttonz onClick={() => navigate('/auth/signin')} label="Đăng nhập" />
    </div>
  );
};

export default Home;
