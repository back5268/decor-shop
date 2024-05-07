import { UserValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addUserApi, getInfoApi, updateUserApi } from '@api';
import { FormDetail } from '@components/base';
import { checkEqualProp } from '@lib/helper';
import { useAuthContext } from '@context/AuthContext';
import { InputCalendarForm, InputForm, MultiRadioz, TextAreaz } from '@components/core';
import { UploadImage } from '@components/shared';
import { genders } from '@constant';

const defaultValues = {
  name: '',
  code: '',
  username: '',
  email: '',
  address: '',
  bio: '',
  gender: 1
};

const DetailUser = (props) => {
  const { userInfo, setUserInfo } = useAuthContext();
  const { open, setOpen, setParams, data } = props;
  const [avatar, setAvatar] = useState(null);
  const isUpdate = typeof open === 'string';
  const item = isUpdate ? data.find((d) => d._id === open) : {};

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm({
    resolver: yupResolver(UserValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate) {
      if (item.avatar) setAvatar(item.avatar);
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const newData = { ...data };
    if (avatar) newData.formData = { avatar };
    else if (item.avatar) newData.avatar = '';
    if (isUpdate) return { ...checkEqualProp(newData, item), _id: open };
    else return newData;
  };

  const onSuccess = async () => {
    if (open === userInfo._id) {
      const response = await getInfoApi();
      if (response) {
        setUserInfo(response);
      } else localStorage.removeItem('token');
    }
  };

  return (
    <FormDetail
      title="nhân viên"
      open={open}
      setOpen={() => {
        setOpen(false);
        setAvatar(null);
        reset();
      }}
      isUpdate={isUpdate}
      insertApi={addUserApi}
      updateApi={updateUserApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      setParams={setParams}
      onSuccess={onSuccess}
    >
      <div className="flex flex-wrap w-full">
        <div className="w-full lg:w-4/12">
          <UploadImage label="Ảnh đại diện" data={avatar} setData={setAvatar} />
        </div>
        <div className="w-full lg:w-8/12">
          <div className="flex flex-wrap">
            <InputForm id="name" label="Tên nhân viên (*)" errors={errors} register={register} />
            <InputForm id="code" label="Mã nhân viên (*)" errors={errors} register={register} />
            <InputForm id="email" label="Email (*)" errors={errors} register={register} />
            <InputForm id="username" label="Tài khoản (*)" errors={errors} register={register} />
            <InputForm id="address" label="Địa chỉ" errors={errors} register={register} />
            <InputCalendarForm id="birthday" label="Ngày sinh" errors={errors} setValue={setValue} watch={watch} />
            <MultiRadioz
              id="gender"
              label="Giới tính:"
              options={genders}
              value={watch('gender')}
              setValue={(e) => setValue('gender', e)}
              className="w-full lg:w-8/12"
            />
            <TextAreaz id="bio" label="Mô tả" value={watch('bio')} setValue={(e) => setValue('bio', e)} />
          </div>
        </div>
      </div>
    </FormDetail>
  );
};

export default DetailUser;
