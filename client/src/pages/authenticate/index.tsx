import HeaderComponent from 'components/headerComp';
import PageContainer from 'components/pageContainer';
import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';

const AuthenticatePage = () => {
  const headerRef = useRef<HTMLElement | null>(null);
  const clientBodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (headerRef?.current && clientBodyRef?.current) clientBodyRef.current.style.minHeight = `calc(100vh - ${headerRef.current?.offsetHeight}px)`;
  }, [headerRef?.current, clientBodyRef?.current]);

  return (
    <div className='w-full'>
      <HeaderComponent ref={headerRef} />
      <div ref={clientBodyRef} className='w-full bg-black flex flex-col justify-center items-center'>
        <PageContainer>
          <div className='max-w-2xl w-full bg-white space-y-4 text-black p-5 mx-auto lg:space-y-6'>
            <Outlet />
          </div>
        </PageContainer>
      </div>
    </div>
  );
};

export default AuthenticatePage;
