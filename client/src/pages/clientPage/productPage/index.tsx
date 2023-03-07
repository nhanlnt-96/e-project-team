import PageContainer from 'components/pageContainer';
import Title from 'components/title';
import CategorySwiper from 'pages/clientPage/productPage/CategorySwiper';
import React from 'react';

const ProductPage = () => {
    return (
        <PageContainer>
            <Title title='Shop' subtitle='Select category below to view product base on category.'/>
            <CategorySwiper/>
        </PageContainer>
    );
};

export default ProductPage;