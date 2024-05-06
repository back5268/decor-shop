import { UserValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {addUserApi, getInfoApi, updateUserApi} from '@api';
import { FormDetail } from '@components/base';
import { checkEqualProp } from '@lib/helper';
import {useAuthContext} from "@context/AuthContext";

const defaultValues = {
  fullName: '',
  username: '',
  email: '',
  address: '',
  bio: '',
  password: '',
  role: 'user',
  status: 1
};

const DetailUser = (props) => {
  const { userInfo, setUserInfo } = useAuthContext()
  const { show, setShow, setParams, data } = props;
  const [avatar, setAvatar] = useState(null);
  const isUpdate = typeof show === 'string';
  const item = isUpdate ? data.find((d) => d._id === show) : {};

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(UserValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate) {
      if (item.avatar) setAvatar(item.avatar)
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const newData = { ...data, status: data.status ? 1 : 0 };
    if (avatar) newData.formData = { avatar }
    else if (item.avatar) newData.avatar = ""
    if (isUpdate) return { ...checkEqualProp(newData, item), status: data.status ? 1 : 0, _id: show };
    else return newData;
  };

  const onSuccess = async () => {
    if (show === userInfo._id) {
      const response = await getInfoApi();
      if (response) {
        setUserInfo(response);
      } else localStorage.removeItem('token');
    }
  }

  return (
    <FormDetail
      title="người dùng"
      open={show}
      setOpen={() => {
        setShow(false);
        setAvatar(null)
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
      <div className={'flex flex-wrap'}>
        
      </div>
    </FormDetail>
  );
};

export default DetailUser;
