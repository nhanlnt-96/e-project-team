import './StoreLocator.scss';

import LocationBanner from 'assets/images/location-cover.jpg';
import ImageResponsive from 'components/imageResponsive';
import PageContainer from 'components/pageContainer';
import Title from 'components/title';
import StoreLocatorListing from 'pages/clientPage/storeLocatorPage/StoreLocatorListing';
import React from 'react';

const StoreLocatorPage = () => {
  return (
    <PageContainer pageContainerClassName='space-y-4 max-w-screen-xl mx-auto md:space-y-6'>
      <div className='w-full'>
        <ImageResponsive width={1220} height={434} imageProps={{ src: LocationBanner, alt: 'twg tea locations' }} />
      </div>
      <Title title='Locations' subtitle='Find the nearest store to you.' />
      <StoreLocatorListing />
    </PageContainer>
  );
};

export default StoreLocatorPage;
