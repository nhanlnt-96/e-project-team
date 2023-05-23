import NewsSwiper from 'components/newsSwiper';
import Billboard from 'pages/clientPage/landingPage/components/billboard';
import React from 'react';

const LandingPage = () => {
  return (
    <div className='w-full'>
      <Billboard />
      <NewsSwiper />
    </div>
  );
};

export default LandingPage;
