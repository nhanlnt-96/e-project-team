import './HeaderComp.scss';

import { Layout } from 'antd';
import Container from 'components/container';
import HeaderDrawer from 'components/headerComp/HeaderDrawer';
import HeaderLink from 'components/headerComp/HeaderLink';
import HeaderToolbar from 'components/headerComp/headerToolbar';
import Logo from 'components/logo';
import React, { forwardRef, memo } from 'react';

const { Header } = Layout;

const HeaderComponent = forwardRef<HTMLElement>((_, ref) => {
  return (
    <Header ref={ref} className='sticky top-0 w-full p-0 z-[999] bg-black'>
      <Container isWideScreen={false} className='h-full border-b border-white flex justify-between items-center text-white'>
        <HeaderLink />
        <HeaderDrawer />
        <Logo className='mx-auto' />
        <HeaderToolbar />
      </Container>
    </Header>
  );
});

HeaderComponent.displayName = 'HeaderComponent';

export default memo(HeaderComponent);
