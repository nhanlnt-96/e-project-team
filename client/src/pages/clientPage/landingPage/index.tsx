import NewsSwiper from 'components/newsSwiper';
import PageContainer from 'components/pageContainer';
import Billboard from 'pages/clientPage/landingPage/components/billboard';
import React from 'react';

const LandingPage = () => {
  return (
    <div className='w-full'>
      <Billboard />
      <PageContainer>
        <NewsSwiper />
      </PageContainer>
    </div>
  );
};

export default LandingPage;
