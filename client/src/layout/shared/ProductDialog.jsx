import { useConfirmState, useProductState, useToastState } from '@store';
import { Buttonz, Hrz, Imagez, Ratez } from '@components/core';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useGetApi } from '@lib/react-query';
import { addToCartApi, detailProductWebApi, getListProductReviewWebApi } from '@api';
import { formatNumber } from '@lib/helper';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useAuthContext } from '@context/AuthContext';
import { useNavigate } from 'react-router-dom';

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

const ProductDialog = () => {
  const navigate = useNavigate()
  const { showToast } = useToastState();
  const { isAuthenticated } = useAuthContext();
  const { showConfirm } = useConfirmState();
  const { productId, setProductId } = useProductState();
  const [product, setProduct] = useState();
  const { data: productz } = useGetApi(detailProductWebApi, { _id: productId }, 'product', Boolean(productId));
  const { data: productRv } = useGetApi(getListProductReviewWebApi, { product: productId }, 'productRv', Boolean(productId));

  useEffect(() => {
    if (productz) setProduct(productz);
  }, [JSON.stringify(productz)]);

  const onWarning = async () => {
    showConfirm({
      title: 'Vui lòng đăng nhập để có thể tiếp tục!',
      action: () => navigate('/auth/signin')
    });
  };

  const onAddToCart = async () => {
    const response = await addToCartApi({ product: productId });
    if (response) showToast({ title: "Thêm sản phẩm vào giỏ hàng thành công", severity: 'success' });
  };

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
            <div className="flex gap-4 items-center">
              <h3 className="text-2xl font-normal text-red-600">{formatNumber(product?.price - product?.sale || 0)} đ</h3>
              {product?.sale && (
                <>
                  <span className="text-gray-500 font-normal text-sm line-through">{formatNumber(product.price)} đ</span>
                  <span className="py-1 px-2 text-xs text-red-500 rounded-lg   bg-red-100 uppercase font-medium">
                    {Math.round((product.sale / product.price) * 100)}% Giảm
                  </span>
                </>
              )}
            </div>
            <span>
              Số lượng:{' '}
              {formatNumber(product?.quantity) || (
                <span className="uppercase text-xs font-medium bg-red-100 text-red-500 rounded-lg px-2 py-1">Hết hàng</span>
              )}
            </span>
            <span>Vận chuyển: Miễn phí vận chuyển</span>
            <span>Chính sách trả hàng: Trả hàng 15 ngày</span>
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-red-500 underline">{product?.vote}</span> <Ratez value={product?.vote} />|
            <span>{formatNumber(productRv?.total || 0) || 0} Đánh giá</span> |<span>{product?.saleNumber} Đã Bán</span>
          </div>
          <Hrz />
          <div className="flex py-2 gap-4 justify-center items-center w-full">
            <Buttonz color="red" variant="outlined">
              Đánh giá
            </Buttonz>
            <Buttonz onClick={() => isAuthenticated ? onAddToCart() : onWarning()}>
              <div className="flex gap-2 items-center">
                <ShoppingCartIcon className="w-5 stroke-2" />
                Thêm vào giỏ hàng
              </div>
            </Buttonz>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <span className="uppercase">Mô tả sản phẩm:</span>
            <Hrz />
            <div dangerouslySetInnerHTML={{ __html: product?.description }} />
          </div>
          <div className="mb-16 mt-4 flex flex-col gap-2">
            <span className="uppercase">Đánh giá sản phẩm:</span>
            <Hrz />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDialog;
