import { PromotionValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addPromotionApi, detailPromotionApi, updatePromotionApi } from '@api';
import { FormDetail } from '@components/base';
import { checkEqualProp, databseDate } from '@lib/helper';
import { DropdownForm, InputCalendarForm, InputForm, TextAreaz } from '@components/core';
import { useParams } from 'react-router-dom';
import { useGetApi } from '@lib/react-query';
import { amountType } from '@constant';

const defaultValues = {
  title: '',
  start: '',
  end: '',
  code: '',
  amount: 0,
  amountType: 1,
  amountMax: 0,
  max: 0,
  description: ''
};

const DetailPromotion = () => {
  const { _id } = useParams();
  const isUpdate = Boolean(_id);
  const { data: item } = useGetApi(detailPromotionApi, { _id }, 'promotion', isUpdate);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(PromotionValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate && item) {
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const newData = { ...data };
    if (newData.start && newData.start !== new Date(item?.start)) newData.start = databseDate(newData.start);
    else newData.start = undefined;
    if (newData.end && newData.end !== new Date(item?.end)) newData.end = databseDate(newData.end);
    else newData.end = undefined;
    if (isUpdate) return { ...checkEqualProp(newData, item), _id };
    else return newData;
  };

  return (
    <FormDetail
      type="nomal"
      title="khuyến mãi"
      isUpdate={isUpdate}
      createApi={addPromotionApi}
      updateApi={updatePromotionApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
    >
      <div className="flex flex-wrap w-full">
        <InputForm id="title" label="Tiêu đề (*)" errors={errors} register={register} />
        <InputForm id="code" label="Mã khuyến mãi (*)" errors={errors} register={register} />
        <InputForm id="max" label="Giới hạn voucher (*)" type="number" errors={errors} register={register} />
        <InputForm id="amount" label="Giá trị khuyến mãi (*)" type="number" errors={errors} register={register} />
        <DropdownForm id="amountType" label="Loại giá trị (*)" options={amountType} errors={errors} watch={watch} setValue={setValue} />
        <InputForm id="amountMax" label="Giới hạn tiền khuyễn mãi (*)" type="number" errors={errors} register={register} />
        <InputCalendarForm id="start" label="Ngày bắt đầu áp dụng (*)" errors={errors} setValue={setValue} watch={watch} />
        <InputCalendarForm id="end" label="Ngày kết thúc" errors={errors} setValue={setValue} watch={watch} />
        <TextAreaz id="description" label="Mô tả" value={watch('description')} setValue={(e) => setValue('description', e)} />
      </div>
    </FormDetail>
  );
};

export default DetailPromotion;
