import './StoreLocator.scss';

import LocationBanner from 'assets/images/location-cover.jpg';
import ImageResponsive from 'components/imageResponsive';
import PageContainer from 'components/pageContainer';
import SEO from 'components/seo';
import Title from 'components/title';
import { useGetCurrentUrl } from 'hooks/useGetCurrentUrl';
import StoreLocatorListing from 'pages/clientPage/storeLocatorPage/StoreLocatorListing';
import React from 'react';

const StoreLocatorPage = () => {
  const pageUrl = useGetCurrentUrl();

  return (
    <>
      <SEO title='TWG Tea | Store Locator' description='Find the nearest store to you.' url={pageUrl} />
      <PageContainer pageContainerClassName='space-y-4 max-w-screen-xl mx-auto md:space-y-6'>
        <div className='w-full'>
          <ImageResponsive width={1220} height={434} imageProps={{ src: LocationBanner, alt: 'twg tea locations' }} />
        </div>
        <Title title='Locations' subtitle='Find the nearest store to you.' />
        <StoreLocatorListing />
      </PageContainer>
    </>
  );
};

export default StoreLocatorPage;
