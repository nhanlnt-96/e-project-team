import Footer from 'components/footer';
import HeaderComponent from 'components/headerComp';
import React from 'react';
import { Outlet } from 'react-router-dom';

const ClientPage = () => {
  return (
    <div className='w-full'>
      <HeaderComponent />
      <div className='w-full bg-black flex flex-col min-h-screen'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default ClientPage;
