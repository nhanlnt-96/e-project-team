import './MyAccountLayout.scss';

import HeaderComponent from 'components/headerComp';
import PageContainer from 'components/pageContainer';
import SEO from 'components/seo';
import { useGetCurrentUrl } from 'hooks/useGetCurrentUrl';
import MyAccountTabs from 'pages/myAccountPage/MyAccountTabs';
import React from 'react';
import { Outlet } from 'react-router-dom';

const MyAccountPageLayout = () => {
  const pageUrl = useGetCurrentUrl();

  return (
    <>
      <SEO title='TWG Tea | My Account' url={pageUrl} />
      <div className='w-full min-h-screen bg-black'>
        <HeaderComponent />
        <PageContainer pageContainerClassName='px-0'>
          <PageContainer pageContainerClassName='bg-white max-w-7xl sm:!px-10'>
            <MyAccountTabs />
            <div className='w-full py-4'>
              <Outlet />
            </div>
          </PageContainer>
        </PageContainer>
      </div>
    </>
  );
};

export default MyAccountPageLayout;
