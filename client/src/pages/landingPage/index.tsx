import {Layout} from 'antd';
import HeaderComponent from 'components/headerComp';
import ProductCard from 'components/productCard';
import React from 'react';

const LandingPage = () => {
    return (
        <Layout className='w-screen h-screen'>
            <HeaderComponent/>
            <div className='my-3'></div>
            <div className='max-w-sm w-full mx-auto'>
                <ProductCard/>
            </div>
        </Layout>
    );
};

export default LandingPage;
