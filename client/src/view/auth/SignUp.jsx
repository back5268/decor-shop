import { SignupValidation } from '@lib/validation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormAuth } from '@components/base';
import { sendOtpSignupApi, signupApi } from '@api';
import { usePostApi } from '@lib/react-query';
import { useNavigate } from 'react-router-dom';
import { useToastState } from '@store';
import { Buttonz, CheckBoxz, Inputz, Linkz } from '@components/core';
import SendOtp from './shared/SendOtp';

const SignUp = () => {
  const navigate = useNavigate();
  const { showToast } = useToastState();
  const { mutateAsync, isPending } = usePostApi(signupApi);
  const [isSend, setIsSend] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    resolver: yupResolver(SignupValidation)
  });

  const onSubmit = async (data) => {
    const response = await mutateAsync(data);
    if (response) {
      showToast({ title: 'Đăng Ký tài khoản thành công', severity: 'success' });
      navigate('/auth/signin');
    }
  };

  return (
    <FormAuth title="Sign Up" subTitle="Nhập thông tin để tiếp tục">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Inputz id="fullName" label="Họ tên (*)" register={register} errors={errors} />
        <Inputz id="email" label="Email (*)" type="email" register={register} errors={errors} disabled={isSend} />
        <Inputz id="username" label="Tài khoản (*)" register={register} errors={errors} disabled={isSend} />
        <Inputz id="password" label="Mật khẩu (*)" register={register} errors={errors} type="password" />
        <SendOtp
          id="otp"
          email={watch('email')}
          username={watch('username')}
          isSend={isSend}
          setIsSend={setIsSend}
          api={sendOtpSignupApi}
          setValue={setValue}
          errors={errors}
        />
        <div className="flex items-center justify-between">
          <CheckBoxz id="remember" label="Đồng ý điều khoản và dịch vụ" />
        </div>
        <Buttonz type="submit" loading={isPending} label="Đăng ký" />
        <div className="flex flex-col gap-2">
          <div className="flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">OR</p>
          </div>
          <div className="text-center">
            <p className="text-md">
              Đã có tài khoản, <Linkz to="/auth/signin" label="Đăng nhập" />
            </p>
          </div>
        </div>
      </form>
    </FormAuth>
  );
};

export default SignUp;
