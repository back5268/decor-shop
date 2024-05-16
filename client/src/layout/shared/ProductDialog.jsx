import { useProductState } from '@store';
import { Buttonz, Hrz, Imagez } from '@components/core';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { PlusIcon, XMarkIcon, MinusIcon } from '@heroicons/react/24/solid';
import { useGetApi } from '@lib/react-query';
import { detailProductWebApi } from '@api';
import { formatNumber } from '@lib/helper';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const CarouselThumb = ({ data }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="w-full">
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff'
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 h-80 rounded-lg"
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            <Imagez className="cursor-pointer rounded-lg" src={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={8}
        slidesPerView={6}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-2"
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            <Imagez className="cursor-pointer rounded-lg" src={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const Quantity = (props) => {
  const { quantity, setQuantity, max } = props;

  return (
    <div className="flex gap-2 items-center">
      <span>Số lượng</span>
      <div className="flex border-[1px] border-border">
        <div className="border-r-[1px] border-border">
          <Buttonz disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)} variant="text" color="gray">
            <MinusIcon className="w-4" />
          </Buttonz>
        </div>
        <div className="w-16 text-lg flex justify-center items-center">{quantity}</div>
        <div className="border-l-[1px] border-border">
          <Buttonz disabled={quantity === max} onClick={() => setQuantity(quantity + 1)} variant="text" color="gray">
            <PlusIcon className="w-4" />
          </Buttonz>
        </div>
      </div>
      <span>Có sẵn {max} sản phẩm</span>
    </div>
  );
};

const ProductDialog = () => {
  const { productId, setProductId } = useProductState();
  const { data: product, isLoading } = useGetApi(detailProductWebApi, { _id: productId }, 'product', Boolean(productId));
  const [quantity, setQuantity] = useState(1);

  return (
    <div
      className={`fixed inset-x-0 inset-y-0 w-screen h-screen z-[52] flex justify-center items-center p-6 ${Boolean(productId) ? '' : 'pointer-events-none'}`}
    >
      <div
        onClick={() => setProductId(null)}
        className={`duration-600 ease-in-out transform absolute w-full h-full bg-black bg-opacity-50 ${Boolean(productId) ? 'opacity-100' : 'opacity-0'}`}
      ></div>
      <div
        className={`fixed right-0 inset-y-0 h-screen w-[600px] bg-white shadow-xl rounded-xl transition-all text-slate-500 py-4
          transform duration-500 ease-in-out z-[52] ${Boolean(productId) ? '' : 'translate-x-full'}`}
      >
        <div className="px-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold uppercase leading-normal text-lg">Thông tin sản phẩm</h2>
            <Buttonz onClick={() => setProductId(null)} color="gray" variant="text" className="p-1 rounded-full mb-2">
              <XMarkIcon className="h-8 w-8 stroke-4" />
            </Buttonz>
          </div>
          <Hrz />
        </div>
        <div className="flex flex-col gap-4 mt-4 overflow-scroll h-body-product px-6 py-4">
          <CarouselThumb data={product?.images} />
          <Hrz />
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-medium">{product?.name}</h3>
            <h3 className="text-2xl font-medium text-red-600">{formatNumber(product?.price)} Đ</h3>
            <span>Vận chuyển: Miễn phí vận chuyển</span>
            <span>Chính sách trả hàng: Trả hàng 15 ngày</span>
          </div>
          <Hrz />
          <div className="flex flex-col gap-6 py-2 justify-center items-center w-full">
            <Quantity quantity={quantity} setQuantity={setQuantity} max={5} />
            <div className="flex gap-2 justify-center">
              <Buttonz variant="outlined" color="red">
                Thêm vào giỏ thàng
              </Buttonz>
              <Buttonz>Mua hàng</Buttonz>
            </div>
          </div>
          <Hrz />
          <span>Thông tin thêm</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDialog;
