import { PromotionValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addPromotionApi, detailPromotionApi, updatePromotionApi } from '@api';
import { Body, DataTable, FormDetail, NumberBody } from '@components/base';
import { checkEqualProp, databseDate } from '@lib/helper';
import { DropdownForm, Hrz, InputCalendarForm, InputForm, MultiSelectz, TextAreaz } from '@components/core';
import { useParams } from 'react-router-dom';
import { useGetApi } from '@lib/react-query';
import { amountType, productType, promotionType } from '@constant';
import { useDataState } from '@store';

const defaultValues = {
  type: 1,
  title: '',
  start: '',
  end: '',
  code: '',
  amount: 0,
  amountType: 1,
  max: 0,
  description: ''
};

const PromotionProduct = (props) => {
  const { productData = [], products, setProducts } = props;
  const columns = [
    { label: 'Tên sản phẩm', field: 'name' },
    { label: 'Mã sản phẩm', field: 'code' },
    { label: 'Loại sản phẩm', body: (item) => Body(productType, item.type) },
    { label: 'Giá bán ra', body: (item) => NumberBody(item.price) },
    { label: 'Số lượng trong kho', body: (item) => NumberBody(item.quantity) }
  ];

  return (
    <div className="flex flex-col">
      <MultiSelectz
        label="Chọn nhân sự (*)"
        value={products}
        setValue={setProducts}
        options={productData?.map((u) => ({ key: u._id, label: `${u.name} - ${u.code}` }))}
        className="my-2 lg:w-6/12 mt-2"
      />
      <DataTable
        total={products.length}
        data={productData?.filter((u) => products.includes(u._id))}
        columns={columns}
        baseActions={['delete']}
        hideParams={true}
        actionsInfo={{
          onDelete: (item) => {
            setProducts((pre) => pre.filter((v) => v !== item._id && v !== 'all'));
          }
        }}
      />
    </div>
  );
};

const DetailPromotion = () => {
  const { _id } = useParams();
  const isUpdate = Boolean(_id);
  const { products: productData } = useDataState();
  const [products, setProducts] = useState([]);
  const { data: item } = useGetApi(detailPromotionApi, { _id }, 'Promotion', isUpdate);

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
      if (item.products) setProducts(item.products)
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const newData = { ...data };
    if (products.length > 0) newData.products = products
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
        <DropdownForm id="type" label="Loại khuyến mãi (*)" disabled={Boolean(_id)} options={promotionType} errors={errors} watch={watch} setValue={setValue} />
        <InputForm id="title" label="Tiêu đề (*)" errors={errors} register={register} />
        {Number(watch('type')) === 2 && (
          <>
            <InputForm id="code" label="Mã khuyến mãi (*)" errors={errors} register={register} />
            <InputForm id="max" label="Giới hạn voucher (*)" type="number" errors={errors} register={register} />
          </>
        )}
        <InputForm id="amount" label="Giá trị khuyến mãi (*)" type="number" errors={errors} register={register} />
        <DropdownForm id="amountType" label="Loại giá trị (*)" options={amountType} errors={errors} watch={watch} setValue={setValue} />
        <InputCalendarForm id="start" label="Ngày bắt đầu áp dụng (*)" errors={errors} setValue={setValue} watch={watch} />
        <InputCalendarForm id="end" label="Ngày kết thúc" errors={errors} setValue={setValue} watch={watch} />
        <TextAreaz id="description" label="Mô tả" value={watch('description')} setValue={(e) => setValue('description', e)} />
      </div>
      <div className="w-full p-2 mt-4">
        <h2 className="font-semibold uppercase text-sm mb-2">Sản phẩm áp dụng</h2>
        <Hrz className="mb-3" />
        <PromotionProduct productData={productData} products={products} setProducts={setProducts} />
      </div>
    </FormDetail>
  );
};

export default DetailPromotion;
