import PageContainer from 'components/pageContainer';
import CategoryBanner from 'pages/clientPage/productPage/CategoryBanner';
import ProductListing from 'pages/clientPage/productPage/ProductListing';
import React from 'react';

const ProductPage = () => {
    return (
        <PageContainer isWideScreen={false} pageContainerClassName='space-y-14'>
            <CategoryBanner/>
            <ProductListing/>
        </PageContainer>
    );
};

export default ProductPage;
