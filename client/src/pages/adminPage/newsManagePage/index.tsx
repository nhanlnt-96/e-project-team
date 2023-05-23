import { Layout } from 'antd';
import ButtonComp from 'components/buttonComp';
import Title from 'components/title';
import { RouteBasePath } from 'constants/index';
import SectionContainer from 'pages/adminPage/components/sectionContainer';
import Sidebar from 'pages/adminPage/components/sidebar';
import CreateNewsButton from 'pages/adminPage/newsManagePage/createNewsButton';
import NewsListing from 'pages/adminPage/newsManagePage/newsListing';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const NewsManagePage = () => {
  const navigate = useNavigate();

  return (
    <Layout className='min-h-screen'>
      <Layout>
        <Sidebar />
        <Content className='p-4 space-y-4'>
          <ButtonComp onClick={() => navigate(RouteBasePath.ADMIN_PAGE_BASE_PATH)}>Back</ButtonComp>
          <SectionContainer>
            <Title title={'News Listing'} titleClassName='text-black' rootClassName='border-b border-black pb-2' />
            <div className='w-ful flex justify-end items-center'>
              <CreateNewsButton />
            </div>
            <NewsListing />
          </SectionContainer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default NewsManagePage;
