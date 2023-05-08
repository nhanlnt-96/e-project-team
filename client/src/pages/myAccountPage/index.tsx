import './MyAccountLayout.scss';

import HeaderComponent from 'components/headerComp';
import PageContainer from 'components/pageContainer';
import MyAccountTabs from 'pages/myAccountPage/MyAccountTabs';
import React from 'react';
import { Outlet } from 'react-router-dom';

const MyAccountPageLayout = () => {
  return (
    <div className='w-full min-h-screen bg-black'>
      <HeaderComponent />
      <PageContainer pageContainerClassName='px-0'>
        <PageContainer pageContainerClassName='bg-white max-w-7xl'>
          <MyAccountTabs />
          <div className='w-full'>
            <Outlet />
          </div>
        </PageContainer>
      </PageContainer>
    </div>
  );
};

export default MyAccountPageLayout;
