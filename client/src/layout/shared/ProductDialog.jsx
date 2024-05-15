import { useProductState } from '@store';
import { Buttonz, Hrz } from '@components/core';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { PlusIcon, XMarkIcon, MinusIcon } from '@heroicons/react/24/solid';

const CustomPaging = () => {
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
        <SwiperSlide>
          <img className="cursor-pointer rounded-lg" src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="cursor-pointer rounded-lg" src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="cursor-pointer rounded-lg" src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="cursor-pointer rounded-lg" src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="cursor-pointer rounded-lg" src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="cursor-pointer rounded-lg" src="https://swiperjs.com/demos/images/nature-6.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="cursor-pointer rounded-lg" src="https://swiperjs.com/demos/images/nature-7.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="cursor-pointer rounded-lg" src="https://swiperjs.com/demos/images/nature-8.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="cursor-pointer rounded-lg" src="https://swiperjs.com/demos/images/nature-9.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="cursor-pointer rounded-lg" src="https://swiperjs.com/demos/images/nature-10.jpg" />
        </SwiperSlide>
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
        <SwiperSlide>
          <img className="cursor-pointer rounded-lg" src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="cursor-pointer rounded-lg" src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="cursor-pointer rounded-lg" src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="cursor-pointer rounded-lg" src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="cursor-pointer rounded-lg" src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="cursor-pointer rounded-lg" src="https://swiperjs.com/demos/images/nature-6.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="cursor-pointer rounded-lg" src="https://swiperjs.com/demos/images/nature-7.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="cursor-pointer rounded-lg" src="https://swiperjs.com/demos/images/nature-8.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="cursor-pointer rounded-lg" src="https://swiperjs.com/demos/images/nature-9.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="cursor-pointer rounded-lg" src="https://swiperjs.com/demos/images/nature-10.jpg" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

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
  const { product, setProduct } = useProductState();
  const [quantity, setQuantity] = useState(1);

  return (
    <div
      className={`fixed inset-x-0 inset-y-0 w-screen h-screen z-[52] flex justify-center items-center p-6 ${Boolean(product) ? '' : 'pointer-events-none'}`}
    >
      <div
        onClick={() => setProduct(null)}
        className={`duration-600 ease-in-out transform absolute w-full h-full bg-black bg-opacity-50 ${Boolean(product) ? 'opacity-100' : 'opacity-0'}`}
      ></div>
      <div
        className={`fixed right-0 inset-y-0 h-screen w-[600px] bg-white shadow-xl rounded-xl transition-all text-slate-500 py-4
          transform duration-500 ease-in-out z-[52] ${Boolean(product) ? '' : 'translate-x-full'}`}
      >
        <div className="px-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold uppercase leading-normal text-lg">Thông tin sản phẩm</h2>
            <Buttonz onClick={() => setProduct(null)} color="gray" variant="text" className="p-1 rounded-full mb-2">
              <XMarkIcon className="h-8 w-8 stroke-4" />
            </Buttonz>
          </div>
          <Hrz />
        </div>
        <div className="flex flex-col gap-4 mt-4 overflow-scroll h-body-product px-6 py-4">
          <CustomPaging />
          <Hrz />
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-medium">Đèn ngủ 3d trang trí decor phòng ngủ, thích hợp làm quà tặng sinh nhật tình yêu</h3>
            <h3 className="text-2xl font-medium text-red-600">22.500 Đ</h3>
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
