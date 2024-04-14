import { Cardz } from '@components/core';
import { useAuthContext } from '@context/AuthContext';
import React from 'react';
import { Navigate } from 'react-router-dom';

const FormAuth = (props) => {
  const { title, subTitle, children } = props;
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) return <Navigate to="/" />;
  return (
    <section className="relative h-screen flex justify-center">
      <div className="absolute bg-cover top-0 left-0 bottom-0 right-0 -z-10 opacity-70">
        <span className="absolute top-0 left-0 w-full h-full bg-primary-500 opacity-30"></span>
      </div>
      <div className="h-full px-4 flex justify-center items-center">
        <Cardz className="flex flex-col w-[400px]">
          <div className="text-center">
            <h3 className="mt-1 pb-1 text-2xl font-bold">{title}</h3>
            <p className="mb-12 text-md">{subTitle}</p>
          </div>
          {children}
        </Cardz>
      </div>
    </section>
  );
};

export default FormAuth;
