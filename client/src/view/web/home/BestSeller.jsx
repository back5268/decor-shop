import React from 'react';
import Slider from 'react-slick';
import { CardProduct, Title } from '../shared';

const BestSeller = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div>
      <Title label="Sản phẩm bán chạy" />
      <div className="card">
        <div className="slider-container mt-4">
          {data?.length > 3 ? (
            <Slider {...settings}>
              {data?.map((item, index) => {
                return <CardProduct item={item} key={index} />;
              })}
            </Slider>
          ) : (
            <div className="flex flex-wrap">
              {data?.length > 0 &&
                data.map((item, index) => {
                  return (
                    <div key={index} className="xs:w-full sm:w-6/12 md:w-4/12 lg:w-3/12">
                      <CardProduct item={item} />
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
