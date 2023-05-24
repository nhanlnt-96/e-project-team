import HeaderComponent from 'components/headerComp';
import React from 'react';
import { Outlet } from 'react-router-dom';

const NewsPageLayout = () => {
  return (
    <div className='w-full'>
      <HeaderComponent />
      <div className='w-full bg-black flex flex-col min-h-screen'>
        <Outlet />
      </div>
    </div>
  );
};

export default NewsPageLayout;
