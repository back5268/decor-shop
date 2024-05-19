import React from 'react';
import BestSeller from './BestSeller';
import ListProduct from './ListProduct';
import { useGetApi } from '@lib/react-query';
import { getListProductWebApi } from '@api';
import { Carousel, IconButton } from '@material-tailwind/react';

const Home = () => {
  const { data: dataBestSell } = useGetApi(getListProductWebApi, { page: 1, limit: 10, sort: { saleNumber: -1 } }, 'dataBestSell');
  const { data: dataDiy } = useGetApi(getListProductWebApi, { limit: 4, type: 'diy' }, 'dataDiy');
  const { data: data3d } = useGetApi(getListProductWebApi, { limit: 4, type: '3d' }, 'data3d');
  const { data: dataTdiy } = useGetApi(getListProductWebApi, { limit: 4, type: 't-diy' }, 'dataTdiy');

  return (
    <div>
      <Carousel
        loop={true}
        autoplay={true}
        autoplayDelay={3000}
        className="h-96"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill('').map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
        prevArrow={({ handlePrev }) => (
          <IconButton variant="text" color="white" size="lg" onClick={handlePrev} className="!absolute top-2/4 left-4 -translate-y-2/4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton variant="text" color="white" size="lg" onClick={handleNext} className="!absolute top-2/4 !right-4 -translate-y-2/4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </IconButton>
        )}
      >
        <img
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
          className="h-full w-full object-cover"
        />
      </Carousel>

      <div className="container flex flex-col gap-20 mt-20">
        <BestSeller data={dataBestSell} />
        <ListProduct label="Đèn ngủ DIY" data={dataDiy} route="/diy-night-light" />
        <ListProduct label="Đèn ngủ 3D" data={data3d} route="/3d-night-light" />
        <ListProduct label="Tranh DIY" data={dataTdiy} route="/diy-painting" />
      </div>
    </div>
  );
};

export default Home;
