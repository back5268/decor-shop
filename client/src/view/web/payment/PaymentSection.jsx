import { Buttonz, CheckBoxz, Dialogz, DropdownForm, Hrz, Imagez, InputForm, Inputz, TextAreaz } from '@components/core';
import React, { useState } from 'react';
import { Stepper, Step } from '@material-tailwind/react';
import { ShoppingBagIcon, MapPinIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { templateType } from '@constant';
import { usePostApi } from '@lib/react-query';
import { checkPromotionApi } from '@api';

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
  const { products } = props;
  const { mutateAsync, isPending } = usePostApi(checkPromotionApi);
  const { code, setCode } = useState();

  const onCheckPromotion = async () => {
    const response = await mutateAsync({ code });
    if (response) {
    }
  };

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
                      <BodyColumn className="flex justify-center"></BodyColumn>
                      <BodyColumn>2</BodyColumn>
                      <BodyColumn>2</BodyColumn>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <BodyColumn className="text-center py-4 !text-sm" colSpan={5}>
                    Không có dữ liệu
                  </BodyColumn>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Hrz className="w-full" />
      <div className="w-full flex items-start">
        <div className="flex items-center w-full">
          <Inputz id="subject" value={code} onChange={(e) => setCode(e.target.value)} label="Mã khuyến mãi" />
          <Buttonz disabled={!code} onClick={() => onCheckPromotion()} label="Áp dụng" />
        </div>
        <div className="flex flex-col gap-2 w-6/12">
          <table>
            <tbody>
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
            </tbody>
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
      <DropdownForm id="type" label="Hình thức thanh toán (*)" options={templateType} errors={errors} watch={watch} setValue={setValue} />
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

const StepThree = () => {
  return (
    <div className="w-10/12 mt-8">
      <div className="flex items-center justify-center">
        <div className="flex flex-col w-6/12 items-center">
          <Imagez
            className="w-80"
            src="https://img.vietqr.io/image/MB-606606868-compact2.png?amount=50000&addInfo=123456&accountName=Bachz"
          />
          <i className="text-red-600 text-sm">*Vui lòng thanh toán đơn hàng trước 16/05/2024</i>
        </div>
        <div className="flex flex-col w-6/12">
          <h3>Cảm ơn bạn đã đặt mua sản phẩm của Decor Day</h3>
          <h3>Đơn hàng của bạn đã được giao cho đơn vị vận chuyển, vui lòng để ý điện thoại.</h3>
          <h3>
            Nếu có bất kỳ thắc mắc nào về sản phẩm và dịch vụ hãy liên hệ với bộ phận CSKH của Decor Day để chúng tôi được phục vụ bạn tốt
            hơn
          </h3>
          <h3>Decor Day xin được cảm ơn bạn rất nhiều và chúc bạn có một ngày may mắn và an lành ạ!</h3>
        </div>
      </div>
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
            <ShoppingBagIcon className="h-5 w-5" />
          </Step>
          <Step
            color="cyan"
            className="cursor-pointer"
            activeClassName="bg-primary"
            completedClassName="bg-primary"
            onClick={() => setActiveStep(1)}
          >
            <MapPinIcon className="h-5 w-5" />
          </Step>
          <Step
            color="cyan"
            className="cursor-pointer"
            activeClassName="bg-primary"
            completedClassName="bg-primary"
            onClick={() => setActiveStep(2)}
          >
            <TrophyIcon className="h-5 w-5" />
          </Step>
        </Stepper>
      </div>
      <Buttonz onClick={() => setActiveStep((pre) => pre + 1)} disabled={activeStep === 2} label="Tiếp theo" />
    </div>
  );
};

const PaymentSection = ({ products, open, setOpen }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [promotions, setPromotions] = useState([]);
  const title = activeStep === 0 ? 'Chọn sản phẩm' : activeStep === 1 ? 'Thông tin nhận hàng' : '';

  return (
    <Dialogz className="w-[1200px]" position="start" title="Giỏ hàng" open={open} setOpen={setOpen}>
      <div className="flex flex-col justify-center items-center w-full">
        <Stepperz activeStep={activeStep} setActiveStep={setActiveStep} />
        <Hrz className="w-full" />
        {title && <h2 className="my-6 uppercase font-semibold">{title}</h2>}
        <div className="flex flex-col items-center w-full h-body-payment overflow-scroll">
          {activeStep === 0 ? <StepOne products={products} /> : activeStep === 1 ? <StepTwo /> : <StepThree />}
        </div>
      </div>
    </Dialogz>
  );
};

export default PaymentSection;
