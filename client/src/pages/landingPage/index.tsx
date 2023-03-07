import { Layout } from 'antd';
import HeaderComponent from 'components/headerComp';
import Billboard from 'pages/landingPage/components/billboard';
import React from 'react';

const { Content } = Layout;

const LandingPage = () => {
  return (
    <Layout className='w-screen h-screen'>
      <HeaderComponent />
      <Content>
        <Billboard />
      </Content>
    </Layout>
  );
};

export default LandingPage;
