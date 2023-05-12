import { Layout } from 'antd';
import ButtonComp from 'components/buttonComp';
import Title from 'components/title';
import { RouteBasePath } from 'constants/index';
import AccountListing from 'pages/adminPage/accountManagePage/accountListing';
import SectionContainer from 'pages/adminPage/components/sectionContainer';
import Sidebar from 'pages/adminPage/components/sidebar';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const AccountManagePage = () => {
  const navigate = useNavigate();

  return (
    <Layout className='min-h-screen'>
      <Layout>
        <Sidebar />
        <Content className='p-4 space-y-4'>
          <ButtonComp onClick={() => navigate(RouteBasePath.ADMIN_PAGE_BASE_PATH)}>Back</ButtonComp>
          <SectionContainer>
            <Title title={'Account listing'} titleClassName='text-black' rootClassName='border-b border-black pb-2' />
            <AccountListing />
          </SectionContainer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AccountManagePage;
