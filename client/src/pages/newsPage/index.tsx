import HeaderComponent from 'components/headerComp';
import SEO from 'components/seo';
import { useGetCurrentUrl } from 'hooks/useGetCurrentUrl';
import React from 'react';
import { Outlet } from 'react-router-dom';

const NewsPageLayout = () => {
  const pageUrl = useGetCurrentUrl();

  return (
    <>
      <SEO title='TWG Tea | News' url={pageUrl} />
      <div className='w-full'>
        <HeaderComponent />
        <div className='w-full bg-black flex flex-col min-h-screen'>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default NewsPageLayout;
