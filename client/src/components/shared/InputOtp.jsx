import { Buttonz, Inputz } from '@components/core';
import React from 'react';

const InputOtp = (props) => {
  const { ...prop } = props;
  return (
    <div className="flex items-start justify-center">
      <Inputz label="Mã OTP (*)" {...prop} />
      <Buttonz className="m-2 px-6 text-center min-w-[100px]">Gửi OTP</Buttonz>
    </div>
  );
};

export default InputOtp;
