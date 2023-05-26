import PageContainer from 'components/pageContainer';
import RecentlyViewedProducts from 'components/recentlyViewedProducts';
import CategoryBanner from 'pages/clientPage/productPage/CategoryBanner';
import ProductListing from 'pages/clientPage/productPage/ProductListing';
import React from 'react';

const ProductPage = () => {
  return (
    <PageContainer isWideScreen={false} pageContainerClassName='space-y-14'>
      <CategoryBanner />
      <ProductListing />
      <RecentlyViewedProducts slidesPerViewTablet={3} slidesPerViewDesktop={5} />
    </PageContainer>
  );
};

export default ProductPage;
