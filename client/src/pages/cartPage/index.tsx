import HeaderComponent from 'components/headerComp';
import PageContainer from 'components/pageContainer';
import SEO from 'components/seo';
import { useGetCurrentUrl } from 'hooks/useGetCurrentUrl';
import React from 'react';
import { Outlet } from 'react-router-dom';

const CartPageLayout = () => {
  const pageUrl = useGetCurrentUrl();

  return (
    <>
      <SEO title='TWG Tea | Cart' url={pageUrl} />
      <div className='w-full min-h-screen flex flex-col bg-black'>
        <HeaderComponent />
        <PageContainer pageContainerClassName='px-0 m-auto'>
          <PageContainer pageContainerClassName='bg-white max-w-7xl sm:!px-10'>
            <div className='w-full py-4'>
              <Outlet />
            </div>
          </PageContainer>
        </PageContainer>
      </div>
    </>
  );
};

export default CartPageLayout;
