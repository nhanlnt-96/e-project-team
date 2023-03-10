import { Layout } from 'antd';
import Sidebar from 'pages/adminPage/components/sidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';

const { Content, Footer } = Layout;

const AdminPage = () => {
  return (
    <Layout className='min-h-screen'>
      <Layout>
        <Sidebar />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
