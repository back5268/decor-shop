import { ReceiptValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { addReceiptApi } from '@api';
import { FormDetail } from '@components/base';
import { DropdownForm, InputCalendarForm, InputForm, TextAreaz } from '@components/core';
import { receiptType } from '@constant';
import { useDataState } from '@store';
import { databseDate } from '@lib/helper';
import { useState } from 'react';
import { UploadFiles } from '@components/shared';

const defaultValues = {
  product: '',
  type: 'imp',
  price: 0,
  quantity: 0,
  note: ''
};

const CreateReceipt = (props) => {
  const { products: productData } = useDataState();
  const [files, setFiles] = useState([]);
  const { open, setOpen, setParams } = props;
  const isUpdate = false;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm({
    resolver: yupResolver(ReceiptValidation),
    defaultValues
  });

  const handleData = (data) => {
    const newData = { ...data };
    if (newData.time) newData.time = databseDate(newData.time);
    if (files?.length > 0) newData.formData = { file: files[0] };
    return newData;
  };

  return (
    <FormDetail
      title="phiếu nhập / xuất"
      open={open}
      setOpen={() => {
        setOpen(false);
        reset();
        setFiles([])
      }}
      isUpdate={isUpdate}
      createApi={addReceiptApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      setParams={setParams}
    >
      <div className="flex flex-wrap w-full">
        <DropdownForm id="product" label="Sản phẩm (*)" options={productData} errors={errors} watch={watch} setValue={setValue} />
        <DropdownForm id="type" label="Loại phiếu (*)" options={receiptType} errors={errors} watch={watch} setValue={setValue} />
        <InputForm id="price" label="Giá nhập / xuất (*)" type="number" errors={errors} register={register} />
        <InputForm id="quantity" label="Số lượng (*)" type="number" errors={errors} register={register} />
        <InputCalendarForm id="time" label="Thời gian nhập / xuất" errors={errors} setValue={setValue} watch={watch} />
        <TextAreaz id="note" label="Ghi chú" value={watch('note')} setValue={(e) => setValue('note', e)} />
      </div>
      <div className="w-full">
        <UploadFiles label="File đính kèm" files={files} setFiles={setFiles} max={1} />
      </div>
    </FormDetail>
  );
};

export default CreateReceipt;
