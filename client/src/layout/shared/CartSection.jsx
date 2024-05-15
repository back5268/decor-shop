import { Buttonz, CheckBoxz, Dialogz, DropdownForm, Hrz, InputForm, Inputz, TextAreaz } from '@components/core';
import React, { useState } from 'react';
import { MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Stepper, Step } from '@material-tailwind/react';
import { HomeIcon, CogIcon, UserIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { templateType } from '@constant';

const HeaderColumn = ({ children, className = '', ...prop }) => (
  <th className={`px-2 py-4 bg-blue-gray-50 font-medium text-center ${className}`} {...prop}>
    {children}
  </th>
);
const BodyColumn = ({ children, className = '', ...prop }) => (
  <td className={`p-2 text-xs text-center ${className}`} {...prop}>
    {children}
  </td>
);

const StepOne = (props) => {
  const { products, setProducts } = props;

  return (
    <div className="flex flex-col overflow-x-auto w-10/12">
      <div className="inline-block min-w-full py-2">
        <div className="overflow-x-auto overflow-y-hidden relative">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <HeaderColumn>
                  <CheckBoxz />
                </HeaderColumn>
                <HeaderColumn>#</HeaderColumn>
                <HeaderColumn>Sản phẩm</HeaderColumn>
                <HeaderColumn>Số lượng</HeaderColumn>
                <HeaderColumn>Đơn giá</HeaderColumn>
                <HeaderColumn>Thành tiền</HeaderColumn>
                <HeaderColumn></HeaderColumn>
              </tr>
            </thead>
            <tbody>
              {products && products.length > 0 ? (
                products.map((item, index) => {
                  return (
                    <tr key={index}>
                      <BodyColumn>
                        <CheckBoxz />
                      </BodyColumn>
                      <BodyColumn>1</BodyColumn>
                      <BodyColumn>2</BodyColumn>
                      <BodyColumn className="flex justify-center">
                        <div className="flex border-border">
                          <div className="border-border w-[64px]">
                            <Buttonz
                              disabled={item.quantity === 1}
                              onClick={() => setProducts(item.quantity - 1)}
                              variant="text"
                              color="gray"
                            >
                              <MinusIcon className="w-4" />
                            </Buttonz>
                          </div>
                          <div className="w-[96px] text-lg flex justify-center items-center">{item.quantity}</div>
                          <div className="border-border w-[64px]">
                            <Buttonz onClick={() => setProducts(item.quantity + 1)} variant="text" color="gray">
                              <PlusIcon className="w-4" />
                            </Buttonz>
                          </div>
                        </div>
                      </BodyColumn>
                      <BodyColumn>2</BodyColumn>
                      <BodyColumn>2</BodyColumn>
                      <BodyColumn>
                        <Buttonz color="red" variant="text" className="p-2">
                          <TrashIcon className="w-5" />
                        </Buttonz>
                      </BodyColumn>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <BodyColumn className="text-center py-4 !text-sm" colspan={5}>
                    Không có dữ liệu
                  </BodyColumn>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full flex items-start">
        <div className="flex items-center w-full">
          <Inputz id="subject" label="Mã khuyến mãi" />
          <Buttonz label="Áp dụng" />
        </div>
        <div className='flex flex-col gap-2 w-6/12'>
          <table>
            <tr>
              <td>Tổng tiền</td>
              <td>100000</td>
            </tr>
            <tr>
              <td>Khuyến mãi</td>
              <td>100000</td>
            </tr>
            <tr>
              <td>Thành tiền</td>
              <td>100000</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

const StepTwo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm({
    defaultValues: {}
  });

  return (
    <div className="w-10/12 flex flex-wrap">
      <InputForm id="subject" label="Họ tên người nhận (*)" errors={errors} register={register} />
      <InputForm id="subject" label="Số điện thoại (*)" errors={errors} register={register} />
      <DropdownForm id="type" label="Tỉnh / Thành phố (*)" options={templateType} errors={errors} watch={watch} setValue={setValue} />
      <DropdownForm id="type" label="Quận / Huyện (*)" options={templateType} errors={errors} watch={watch} setValue={setValue} />
      <DropdownForm id="type" label="Phường / Xã (*)" options={templateType} errors={errors} watch={watch} setValue={setValue} />
      <InputForm id="subject" label="Địa chỉ cụ thể (*)" errors={errors} register={register} />
      <TextAreaz id="description" label="Ghi chú" value={watch('description')} setValue={(e) => setValue('description', e)} />
    </div>
  );
};

const Stepperz = ({ activeStep, setActiveStep }) => {
  return (
    <div className="w-full flex justify-between py-8 px-8">
      <Buttonz onClick={() => setActiveStep((pre) => pre - 1)} disabled={activeStep === 0} variant="outlined" color="red" label="Trở lại" />
      <div className="w-[700px]">
        <Stepper activeLineClassName="bg-primary" activeStep={activeStep}>
          <Step
            color="cyan"
            className="cursor-pointer"
            activeClassName="bg-primary"
            completedClassName="bg-primary"
            onClick={() => setActiveStep(0)}
          >
            <HomeIcon className="h-5 w-5" />
          </Step>
          <Step
            color="cyan"
            className="cursor-pointer"
            activeClassName="bg-primary"
            completedClassName="bg-primary"
            onClick={() => setActiveStep(1)}
          >
            <UserIcon className="h-5 w-5" />
          </Step>
        </Stepper>
      </div>
      <Buttonz onClick={() => setActiveStep((pre) => pre + 1)} disabled={activeStep === 1} label="Tiếp theo" />
    </div>
  );
};

const CartSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [products, setProducts] = useState([{}, {}]);
  const [open, setOpen] = useState(false);
  const title = activeStep === 0 ? 'Chọn sản phẩm' : 'Thông tin nhận hàng';

  return (
    <>
      <Buttonz onClick={() => setOpen(true)} color="gray" variant="text" className="!p-0 hover:bg-hover-sidebar">
        <ShoppingCartIcon className="w-6 m-2 text-on-sidebar" />
      </Buttonz>
      <Dialogz className="w-[1200px]" position="start" title="Giỏ hàng" open={open} setOpen={setOpen}>
        <div className="flex flex-col justify-center items-center w-full">
          <Stepperz activeStep={activeStep} setActiveStep={setActiveStep} />
          <Hrz className="w-full" />
          <h2 className="my-6 uppercase font-semibold">{title}</h2>
          <div className="flex flex-col items-center w-full h-body-payment overflow-scroll">
            {activeStep === 0 ? (
              <StepOne products={products} setProducts={setProducts} />
            ) : (
              <StepTwo products={products} setProducts={setProducts} />
            )}
          </div>
        </div>
      </Dialogz>
    </>
  );
};

export default CartSection;
