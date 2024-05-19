import { ProductValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addProductApi, detailProductApi, updateProductApi } from '@api';
import { FormDetail } from '@components/base';
import { checkEqualProp } from '@lib/helper';
import { DropdownForm, InputForm, Tabz, TextAreaz } from '@components/core';
import { useParams } from 'react-router-dom';
import { useGetApi } from '@lib/react-query';
import { productType } from '@constant';
import { UploadFiles, UploadImage } from '@components/shared';
import Editorz from '@components/core/Editorz';

const defaultValues = {
  name: '',
  code: '',
  type: '',
  price: 0,
  sale: 0,
  description: ''
};

const ProductHistory = () => {
  return <></>;
};

const ProductInfo = (props) => {
  const { avatar, setAvatar, images, setImages } = props;

  return (
    <div className="flex flex-wrap w-full">
      <div className="w-full lg:w-4/12">
        <UploadImage label="Ảnh đại diện" data={avatar} setData={setAvatar} className="lg:mr-6" />
      </div>
      <div className="w-full lg:w-8/12">
        <UploadFiles label="Hình ảnh mô tả" type="image" files={images} setFiles={setImages} />
      </div>
    </div>
  );
};

const DetailProduct = () => {
  const { _id } = useParams();
  const isUpdate = Boolean(_id);
  const { data: item } = useGetApi(detailProductApi, { _id }, 'product', isUpdate);
  const [activeTab, setActiveTab] = useState('info');
  const [avatar, setAvatar] = useState(null);
  const [images, setImages] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(ProductValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate && item) {
      if (item.avatar) setAvatar(item.avatar);
      if (item.images) setImages(item.images);
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    let newData = { ...data };
    if (isUpdate) newData = { ...checkEqualProp(newData, item), _id }
    if (images?.length > 0) {
      if (JSON.stringify(images) !== JSON.stringify(item?.images)) {
        const newImages = [];
        const formData = [];
        images.forEach((f) => {
          if (item?.images.some((i) => JSON.stringify(i) === JSON.stringify(f))) newImages.push(f);
          else formData.push(f);
        });
        if (newImages.length > 0) newData.images = newImages;
        if (formData.length > 0) newData.formData = { images: formData };
      }
    } else if (item?.images?.length > 0) newData.images = [];
    if (avatar && avatar !== item?.avatar) {
      if (newData.formData) newData.formData = { ...newData.formData, avatar };
      else newData.formData = { avatar };
    }
    return newData;
  };

  const data = [
    { label: 'Thông tin thêm', value: 'info', children: () => ProductInfo({ avatar, setAvatar, images, setImages }) },
    { label: 'Lịch sử xuất / nhập', value: 'history', children: () => ProductHistory({}) }
  ];

  return (
    <FormDetail
      type="nomal"
      title="sản phẩm"
      isUpdate={isUpdate}
      createApi={addProductApi}
      updateApi={updateProductApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
    >
      <div className="flex flex-wrap w-full">
        <DropdownForm id="type" label="Loại sản phẩm (*)" options={productType} errors={errors} watch={watch} setValue={setValue} />
        <InputForm id="name" label="Tên sản phẩm (*)" errors={errors} register={register} />
        <InputForm id="code" label="Mã sản phẩm (*)" errors={errors} register={register} />
        <InputForm id="price" label="Giá bán ra (*)" type="number" errors={errors} register={register} />
        <InputForm id="sale" label="Khuyến mãi (*)" type="number" errors={errors} register={register} />
        <Editorz id="description" label="Mô tả sản phẩm" data={watch('description')} setData={(e) => setValue('description', e)} />
        <div className="flex flex-col gap-2 card m-2 w-full">
          <Tabz data={data} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
    </FormDetail>
  );
};

export default DetailProduct;
