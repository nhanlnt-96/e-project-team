import Title from 'components/title';
import SectionContainer from 'pages/adminPage/components/sectionContainer';
import CreateNewProductButton from 'pages/adminPage/productManage/createNewProductButton';
import ProductListing from 'pages/adminPage/productManage/productListing';
import React from 'react';

const ProductManage = () => {
    return (
        <SectionContainer>
            <Title title={'Product listing'} titleClassName='text-black' rootClassName='border-b border-black pb-2'/>
            <div className='w-ful flex justify-end items-center'>
                <CreateNewProductButton/>
            </div>
            <ProductListing/>
        </SectionContainer>
    );
};

export default ProductManage;