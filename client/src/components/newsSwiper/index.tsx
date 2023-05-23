import Loading from 'components/loading';
import NewsItem from 'components/newsSwiper/NewsItem';
import SwiperComp from 'components/swiperComp';
import { useEffectOnce } from 'hooks/useEffectOnce';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAllNewsThunk } from 'redux/newsManage/getAllNewsSlice';
import { getAllNewsSelector } from 'redux/newsManage/selector';
import { SwiperSlide } from 'swiper/react';

const NewsSwiper = () => {
  const dispath = useAppDispatch();
  const { isLoading, newsData } = useAppSelector(getAllNewsSelector);

  useEffectOnce(() => {
    if (!newsData.length) dispath(getAllNewsThunk());
  });

  return (
    <div className='w-full'>
      {!isLoading ? (
        newsData.length ? (
          <SwiperComp slidesPerView={3} spaceBetween={24}>
            {newsData.map((news) => (
              <SwiperSlide key={news.newsId}>
                <NewsItem newsData={news} />
              </SwiperSlide>
            ))}
          </SwiperComp>
        ) : (
          <></>
        )
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default NewsSwiper;
