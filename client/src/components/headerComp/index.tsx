import './HeaderComp.scss';

import { Layout } from 'antd';
import Container from 'components/container';
import HeaderDrawer from 'components/headerComp/HeaderDrawer';
import HeaderLink from 'components/headerComp/HeaderLink';
import HeaderToolbar from 'components/headerComp/HeaderToolbar';
import Logo from 'components/logo';
import React, { memo } from 'react';

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
  return (
    <Header className='bg-transparent sticky p-0'>
      <Container isWideScreen={false} className='h-full border-b border-white flex justify-between items-center'>
        <HeaderLink />
        <HeaderDrawer />
        <Logo className='mx-auto' />
        <HeaderToolbar />
      </Container>
    </Header>
  );
};

export default memo(HeaderComponent);
