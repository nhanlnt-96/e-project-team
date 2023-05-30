import Divider from 'components/divider';
import NewestProductSlider from 'components/newestProductSlider';
import NewsSwiper from 'components/newsSwiper';
import PageContainer from 'components/pageContainer';
import RecentlyViewedProducts from 'components/recentlyViewedProducts';
import AccessoryBanner from 'pages/clientPage/landingPage/components/accessoryBanner';
import Billboard from 'pages/clientPage/landingPage/components/billboard';
import NewsAndVideo from 'pages/clientPage/landingPage/components/newsAndVideo';
import VideoBanner from 'pages/clientPage/landingPage/components/videoBanner';
import React from 'react';

const LandingPage = () => {
  return (
    <div className='w-full'>
      <Billboard />
      <PageContainer pageContainerClassName='max-w-7xl'>
        <NewestProductSlider />
        <Divider />
        <NewsAndVideo />
        <Divider />
        <VideoBanner />
        <Divider />
        <AccessoryBanner />
        <Divider />
        <NewsSwiper />
        <Divider />
        <RecentlyViewedProducts />
      </PageContainer>
    </div>
  );
};

export default LandingPage;
