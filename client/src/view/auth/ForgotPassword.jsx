import { FormAuth } from '@components/base';
import { ForgotPasswordValidation } from '@lib/validation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { confirmPasswordApi, sendOtpForgotPasswordApi } from '@api';
import { usePostApi } from '@lib/react-query';
import { useNavigate } from 'react-router-dom';
import { useToastState } from '@store';
import { Buttonz, CheckBoxz, Inputz, Linkz } from '@components/core';
import SendOtp from './shared/SendOtp';

const SignIn = () => {
  const navigate = useNavigate();
  const { showToast } = useToastState();
  const [isSend, setIsSend] = useState();
  const { mutateAsync, isPending } = usePostApi(confirmPasswordApi);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: yupResolver(ForgotPasswordValidation)
  });

  const onSubmit = async (data) => {
    const response = await mutateAsync(data);
    if (response) {
      showToast({ title: 'Đổi mật khẩu thành công', severity: 'success' });
      navigate('/auth/signin');
    }
  };

  return (
    <FormAuth title="Forgot Password" subTitle="Nhập thông tin để tiếp tục">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Inputz id="email" label="Email (*)" type="email" register={register} errors={errors} />
        <Inputz id="username" label="Tài khoản (*)" register={register} errors={errors} />
        <Inputz id="password" label="Mật khẩu (*)" type="password" register={register} errors={errors} />
        <SendOtp
          id="otp"
          register={register}
          errors={errors}
          email={watch('email')}
          username={watch('username')}
          isSend={isSend}
          setIsSend={setIsSend}
          api={sendOtpForgotPasswordApi}
        />
        <div className="flex items-center justify-between">
          <CheckBoxz id="remember" label="Đồng ý điều khoản và dịch vụ" />
        </div>
        <Buttonz type="submit" loading={isPending} label="Submit" />
        <div className="flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">OR</p>
        </div>
        <div className="text-center">
          <p className="text-md">
            <Linkz to="/auth/signin" label="Quay lại đăng nhập" />
          </p>
        </div>
      </form>
    </FormAuth>
  );
};

export default SignIn;
