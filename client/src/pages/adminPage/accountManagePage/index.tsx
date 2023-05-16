import { Layout } from 'antd';
import ButtonComp from 'components/buttonComp';
import { RouteBasePath } from 'constants/index';
import SectionContainer from 'pages/adminPage/components/sectionContainer';
import Sidebar from 'pages/adminPage/components/sidebar';
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const { Content } = Layout;

const AccountManagePage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Layout className='min-h-screen'>
      <Layout>
        <Sidebar />
        <Content className='p-4 space-y-4'>
          <ButtonComp
            onClick={() =>
              navigate(
                pathname === RouteBasePath.ADMIN_ACCOUNT_MANAGE_PAGE_BASE_PATH
                  ? RouteBasePath.ADMIN_PAGE_BASE_PATH
                  : RouteBasePath.ADMIN_ACCOUNT_MANAGE_PAGE_BASE_PATH
              )
            }
          >
            Back
          </ButtonComp>
          <SectionContainer>
            <Outlet />
          </SectionContainer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AccountManagePage;
