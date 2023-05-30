import NewsBg from 'assets/images/news-video-banner-news.png';
import VideoBg from 'assets/images/news-video-banner-video.jpeg';
import ImageResponsive from 'components/imageResponsive';
import { RouteBasePath } from 'constants/index';
import React from 'react';
import { Link } from 'react-router-dom';

const NewsAndVideo: React.FC = () => {
  return (
    <div className='w-full flex justify-center items-strench flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4'>
      <Link
        to={`${RouteBasePath.CLIENT_NEWS_PAGE_BASE_PATH}/${RouteBasePath.CLIENT_NEWS_DETAIL_PAGE_BASE_PATH}/9`}
        target='_blank'
        className='w-full block md:w-2/3'
      >
        <ImageResponsive width={810} height={480} imageProps={{ src: NewsBg, alt: 'Beyond a fine cup of darjeeling' }} />
      </Link>
      <Link to='https://www.youtube.com/watch?v=sVKJLIMxmFg&t=1s' target='_blank' className='w-full block md:w-1/3'>
        <ImageResponsive width={405} height={480} imageProps={{ src: VideoBg, alt: 'Journey to Darjeeling Tea Plantation' }} />
      </Link>
    </div>
  );
};

export default NewsAndVideo;
