import Loading from 'components/loading';
import NewsItem from 'components/newsSwiper/NewsItem';
import SwiperComp from 'components/swiperComp';
import Title from 'components/title';
import { useEffectOnce } from 'hooks/useEffectOnce';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAllNewsThunk } from 'redux/newsManage/getAllNewsSlice';
import { getAllNewsSelector } from 'redux/newsManage/selector';
import { SwiperSlide } from 'swiper/react';

const NewsSwiper = () => {
  const { newsId } = useParams();
  const dispatch = useAppDispatch();
  const { isLoading, newsData } = useAppSelector(getAllNewsSelector);

  const newsDataList = useMemo(() => {
    return newsId ? newsData.filter((news) => news.newsId !== Number.parseInt(newsId)) : newsData;
  }, [newsId, newsData]);

  useEffectOnce(() => {
    if (!newsData.length) dispatch(getAllNewsThunk());
  });

  return (
    <div className='w-full text-white block space-y-4 sm:space-y-8'>
      <Title variant='h6' title='News' titleClassName='!font-jost text-2xl font-medium !uppercase not-italic sm:text-3xl' />
      {!isLoading ? (
        newsDataList.length ? (
          <SwiperComp
            slidesPerView={1}
            spaceBetween={10}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20
              }
            }}
          >
            {newsDataList.map((news) => (
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
