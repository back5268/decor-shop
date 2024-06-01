import React from 'react';
import { useForm } from 'react-hook-form';
import { FormAuth } from '@components/base';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePostApi } from '@lib/react-query';
import { SigninValidation } from '@lib/validation';
import { useToastState } from '@store';
import { getInfoApi, signinApi, signinGoogleApi } from '@api';
import { useAuthContext } from '@context/AuthContext';
import { Buttonz, CheckBoxz, InputForm, Linkz } from '@components/core';
import { useNavigate } from 'react-router-dom';
import { InputPassword } from '@components/shared';
import { GoogleLogin } from '@react-oauth/google';

const SignIn = () => {
  const navigate = useNavigate();
  const { showToast } = useToastState();
  const { setUserInfo, setIsAuthenticated } = useAuthContext();
  const { mutateAsync, isPending } = usePostApi(signinApi);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SigninValidation)
  });

  const onSubmit = async (data) => {
    const response = await mutateAsync(data);
    if (response) {
      localStorage.setItem('token', response);
      const res = await getInfoApi();
      if (res) {
        setUserInfo(res);
        setIsAuthenticated(true);
        showToast({ title: 'Đăng nhập thành công', severity: 'success' });
        navigate('/');
      }
    }
  };

  const handleLogin = async (responsez) => {
    const response = await signinGoogleApi({ token: responsez.credential });
    if (response) {
      localStorage.setItem('token', response);
      const res = await getInfoApi();
      if (res) {
        setUserInfo(res);
        setIsAuthenticated(true);
        showToast({ title: 'Đăng nhập thành công', severity: 'success' });
        navigate('/');
      }
    }
  };

  return (
    <FormAuth title="Vui lòng đăng nhập để tiếp tục">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
        <InputForm id="username" label="Tài khoản (*)" register={register} errors={errors} className="!w-full" />
        <InputPassword id="password" label="Mật khẩu (*)" register={register} errors={errors} className="!w-full" />
        <div className="flex flex-col gap-2 px-2 mb-4">
          <div className="flex items-center justify-between">
            <CheckBoxz id="remember" label="Nhớ mật khẩu" />
            <Linkz to="/auth/forgot-password" label="Quên mật khẩu?" className="text-sm" />
          </div>
          <Buttonz type="submit" loading={isPending} label="Đăng nhập" />
          <div className="text-center">
            <p className="mt-2 text-sm">
              Chưa có tài khoản, <Linkz to="/auth/signup" label="Đăng ký" />
            </p>
          </div>
          <div className="flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-border after:mt-0.5 after:flex-1 after:border-t after:border-border">
            <p className="mx-4 mb-0 text-center font-semibold">or</p>
          </div>
          <div className="flex justify-center">
            <GoogleLogin className="w-full" onSuccess={handleLogin} />
          </div>
        </div>
      </form>
    </FormAuth>
  );
};

export default SignIn;
