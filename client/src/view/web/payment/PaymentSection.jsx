import { Buttonz, Dialogz, DropdownForm, Hrz, Imagez, InputForm, Inputz, TextAreaz } from '@components/core';
import React, { useEffect, useState } from 'react';
import { Stepper, Step } from '@material-tailwind/react';
import { ShoppingBagIcon, MapPinIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { paymentType } from '@constant';
import { checkPromotionApi, orderProductApi } from '@api';
import DataTablePayment from './DataTablePayment';
import { formatNumber } from '@lib/helper';
import { PaymentValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToastState } from '@store';
import moment from 'moment';
import cities from '../../../data/cities';
import districts from '../../../data/districts';
import wards from '../../../data/wards';

const StepOne = (props) => {
  const { products, summary, setSummary, disabled, promotion, setPromotion } = props;
  const [code, setCode] = useState();
  let total = products.reduce((accumulator, currentItem) => {
    return accumulator + (currentItem.price - currentItem.sale) * currentItem.number;
  }, 0);

  const onCheckPromotion = async () => {
    const response = await checkPromotionApi({ code });
    if (response) {
      setPromotion(response);
    }
  };

  useEffect(() => {
    let amount = 0;
    if (promotion) {
      if (promotion.amountType === 1) amount = promotion.amount;
      else amount = (promotion.amount * total) / 100;
      if (promotion.amountMax && amount > promotion.amountMax) amount = promotion.amountMax;
    }
    setSummary(total - amount < 0 ? 0 : total - amount);
  }, [JSON.stringify(promotion), JSON.stringify(products)]);

  const columns = [
    {
      label: 'Sản phẩm',
      body: (e) => (
        <div className="flex gap-2 items-center">
          <div className="h-20 w-20 cursor-pointer" onClick={() => setProductId(e._id)}>
            <Imagez src={e.avatar} className="h-20 w-20" />
          </div>
          <div className="flex flex-col gap-2 text-left">
            <p>{e.name}</p>
            <p className="font-medium">#{e.code}</p>
          </div>
        </div>
      ),
      className: 'max-w-48'
    },
    {
      label: 'Số lượng',
      body: (e) => formatNumber(e.number)
    },
    { label: 'Đơn giá', body: (e) => formatNumber(e.price - e.sale || 0) },
    { label: 'Thành tiền', body: (e) => formatNumber((e.price - e.sale) * e.number) }
  ];

  return (
    <div className="flex flex-col overflow-x-auto w-10/12">
      <DataTablePayment data={products} columns={columns} />
      <Hrz className="w-full" />
      <div className="w-full flex items-start mt-8">
        <div className="flex flex-col gap-2 items-left w-6/12">
          <div className="flex gap-2 items-center w-full">
            <Inputz
              disabled={disabled}
              className="!w-6/12"
              id="subject"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              label="Mã khuyến mãi"
            />
            <Buttonz disabled={!code || disabled} onClick={() => onCheckPromotion()} label="Áp dụng" />
          </div>
          {Boolean(promotion) && <div className="w-8/12 p-2"><div className='card'>{promotion.description}</div></div>}
        </div>
        <div className="flex flex-col gap-2 w-6/12">
          <table>
            <tbody>
              <tr>
                <td>Thành tiền</td>
                <td>{formatNumber(total)}</td>
              </tr>
              <tr>
                <td>Khuyến mãi</td>
                <td>{formatNumber(total - summary)}</td>
              </tr>
              <tr>
                <td>Tổng thanh toán</td>
                <td>{formatNumber(summary)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StepTwo = (props) => {
  const { watch, register, errors, setValue, disabled } = props;

  return (
    <div className="w-10/12 flex flex-wrap">
      <DropdownForm
        id="type"
        label="Hình thức thanh toán (*)"
        options={paymentType}
        errors={errors}
        watch={watch}
        setValue={setValue}
        disabled={disabled}
      />
      <InputForm id="name" label="Họ tên người nhận (*)" errors={errors} register={register} disabled={disabled} />
      <InputForm id="phone" label="Số điện thoại (*)" errors={errors} register={register} disabled={disabled} />
      <DropdownForm
        id="city"
        label="Tỉnh / Thành phố (*)"
        options={cities}
        optionLabel="name"
        optionValue="code"
        errors={errors}
        watch={watch}
        onChange={(e) => {
          setValue('city', e);
          setValue('district', undefined);
        }}
        disabled={disabled}
      />
      <DropdownForm
        id="district"
        label="Quận / Huyện (*)"
        options={districts.filter((d) => d.city_code === watch('city'))}
        optionLabel="name"
        optionValue="id"
        errors={errors}
        watch={watch}
        onChange={(e) => {
          setValue('district', e);
          setValue('ward', undefined);
        }}
        disabled={disabled}
        emptyMessage="Vui lòng chọn tỉnh / thành phố"
      />
      <DropdownForm
        id="ward"
        label="Phường / Xã (*)"
        options={wards.filter((d) => d.district_id === Number(watch('district')))}
        optionLabel="name"
        optionValue="id"
        errors={errors}
        watch={watch}
        disabled={disabled}
        onChange={(e) => {
          setValue('ward', e);
        }}
        emptyMessage="Vui lòng chọn quận / huyện"
      />
      <InputForm id="address" label="Địa chỉ cụ thể" errors={errors} register={register} disabled={disabled} />
      <TextAreaz id="note" label="Ghi chú" value={watch('note')} setValue={(e) => setValue('note', e)} disabled={disabled} />
    </div>
  );
};

const StepThree = ({ order }) => {
  return (
    <div className="w-10/12 mt-8">
      <div className="flex items-center justify-center">
        {order?.qrCode && (
          <div className="flex flex-col w-6/12 items-center">
            <Imagez className="w-80" src={order.qrCode} />
            <i className="text-red-600 text-sm">
              *Vui lòng thanh toán đơn hàng trước {moment().add(1, 'days').format('DD/MM/YYYY HH:mm:ss')}
            </i>
          </div>
        )}
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

const Stepperz = ({ activeStep, activeStepMax, setActiveStep, trigger, onSubmit }) => {
  const onNext = async () => {
    if (activeStepMax === 1 && activeStep === 1) {
      const isValid = await trigger();
      if (isValid) {
        onSubmit();
      }
    } else setActiveStep((pre) => pre + 1);
  };

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
            onClick={() => activeStepMax === 2 && setActiveStep(2)}
          >
            <TrophyIcon className="h-5 w-5" />
          </Step>
        </Stepper>
      </div>
      <Buttonz type="button" onClick={onNext} disabled={activeStep === 2} label="Tiếp theo" />
    </div>
  );
};

const PaymentSection = ({ products, open, setOpen }) => {
  const { showToast } = useToastState();
  const [activeStep, setActiveStep] = useState(0);
  const [activeStepMax, setActiveStepMax] = useState(0);
  const [summary, setSummary] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [promotion, setPromotion] = useState(null);
  const [order, setOrder] = useState(null);
  const title = activeStep === 0 ? 'Áp dụng khuyến mãi' : activeStep === 1 ? 'Thông tin nhận hàng' : '';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    trigger,
    watch
  } = useForm({
    resolver: yupResolver(PaymentValidation),
    defaultValues: {}
  });

  useEffect(() => {
    if (activeStep && activeStep > activeStepMax) {
      if (activeStep === 2) setDisabled(true);
      setActiveStepMax(activeStep);
    }
  }, [activeStep]);

  const onSubmit = async (data) => {
    const params = { ...data };
    params.city = cities.find((c) => c.code === data.city)?.name;
    params.district = districts.find((c) => String(c.id) === data.district)?.name;
    params.ward = wards.find((c) => String(c.id) === data.ward)?.name;
    const response = await orderProductApi({
      ...params,
      products: products.map((p) => ({ _id: p._id, quantity: p.number })),
      promotionCode: promotion?.code
    });
    if (response) {
      showToast({ title: 'Đặt hàng thành công!', severity: 'success' });
      setOrder(response);
      setActiveStep((pre) => pre + 1);
    }
  };

  return (
    <Dialogz
      className="w-[1200px]"
      position="start"
      title="Giỏ hàng"
      open={open}
      setOpen={() => {
        setOpen(false);
        setActiveStep(0);
        setActiveStepMax(0);
        setSummary(0);
        setDisabled(false);
        setPromotion(null);
        reset();
      }}
    >
      <form>
        <div className="flex flex-col justify-center items-center w-full">
          <Stepperz
            activeStep={activeStep}
            activeStepMax={activeStepMax}
            setActiveStep={setActiveStep}
            trigger={trigger}
            onSubmit={handleSubmit(onSubmit)}
          />
          <Hrz className="w-full" />
          {title && <h2 className="my-6 uppercase font-semibold">{title}</h2>}
          <div className="flex flex-col items-center w-full h-body-payment overflow-scroll">
            {activeStep === 0 ? (
              <StepOne
                disabled={disabled}
                setPromotion={setPromotion}
                promotion={promotion}
                products={products}
                summary={summary}
                setSummary={setSummary}
              />
            ) : activeStep === 1 ? (
              <StepTwo disabled={disabled} watch={watch} register={register} errors={errors} setValue={setValue} />
            ) : (
              <StepThree order={order} />
            )}
          </div>
        </div>
      </form>
    </Dialogz>
  );
};

export default PaymentSection;
