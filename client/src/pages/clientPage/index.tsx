import { Layout } from 'antd';
import HeaderComponent from 'components/headerComp';
import React from 'react';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const ClientPage = () => {
  return (
    <Layout className='w-screen min-h-screen'>
      <HeaderComponent />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default ClientPage;