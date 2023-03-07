import { Layout } from 'antd';
import HeaderComponent from 'components/headerComp';
import React from 'react';

const LandingPage = () => {
  return (
    <Layout className='w-screen h-screen bg-black'>
      <HeaderComponent />
    </Layout>
  );
};

export default LandingPage;
