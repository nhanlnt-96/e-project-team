import './HeaderComp.scss';

import { Layout } from 'antd';
import Container from 'components/container';
import HeaderDrawer from 'components/headerComp/HeaderDrawer';
import HeaderLink from 'components/headerComp/HeaderLink';
import HeaderToolbar from 'components/headerComp/HeaderToolbar';
import Logo from 'components/logo';
import React, { memo, useEffect, useState } from 'react';

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
  const [windowScrolling, setWindowScrolling] = useState<number>(0);

  useEffect(() => {
    const handleDetectWindowScrolling = () => {
      setWindowScrolling(window.pageYOffset);
    };

    window.addEventListener('scroll', () => handleDetectWindowScrolling());

    handleDetectWindowScrolling();

    return () => window.removeEventListener('scroll', () => handleDetectWindowScrolling());
  }, []);

  return (
    <Header className={`sticky top-0 w-full p-0 z-50 ${windowScrolling > 0 ? 'bg-black' : 'bg-black lg:bg-transparent'} lg:fixed`}>
      <Container isWideScreen={false} className='h-full border-b border-white flex justify-between items-center text-white'>
        <HeaderLink />
        <HeaderDrawer />
        <Logo className='mx-auto' />
        <HeaderToolbar />
      </Container>
    </Header>
  );
};

export default memo(HeaderComponent);
