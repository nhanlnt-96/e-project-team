import { Layout } from 'antd';
import ButtonComp from 'components/buttonComp';
import Logo from 'components/logo';
import PageContainer from 'components/pageContainer';
import Title from 'components/title';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const pageNotFoundSubtitle = `
    <p class='w-full text-center mt-10'>
      <span class="block">We apologize, we can not find the page you are looking for.</span>
      <span class="block">Please contact out Customer Service or navigate to another page.</span>
      <span class="block !mt-6">Thank you.</span>
    </p>
`;

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='h-screen flex flex-col bg-black'>
      <Header className='sticky top-0 w-full p-0 z-50 flex justify-center items-center bg-black border-b border-light-silver'>
        <Logo />
      </Header>
      <PageContainer pageContainerClassName='my-auto space-y-10'>
        <Title variant='h1' title='Page not found' subtitle={pageNotFoundSubtitle} />
        <ButtonComp className='mx-auto' onClick={() => navigate('/')}>
          Go to the main page
        </ButtonComp>
      </PageContainer>
    </div>
  );
};

export default PageNotFound;
