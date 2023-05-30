import './AboutUsPage.scss';

import Loading from 'components/loading';
import PageContainer from 'components/pageContainer';
import { useEffectOnce } from 'hooks/useEffectOnce';
import AboutUsItem from 'pages/clientPage/aboutUsPage/AboutUsItem';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAllNewsThunk } from 'redux/newsManage/getAllNewsSlice';
import { getAllNewsSelector } from 'redux/newsManage/selector';

const AboutUsPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, aboutUsData } = useAppSelector(getAllNewsSelector);

  useEffectOnce(() => {
    if (!aboutUsData.length) dispatch(getAllNewsThunk());
  });

  return (
    <>
      <PageContainer pageContainerClassName='space-y-6 max-w-screen-xl mx-auto md:space-y-20 about-us-page'>
        {aboutUsData.length ? (
          aboutUsData.map((content) => <AboutUsItem key={content.newsId} aboutUsContent={content} />)
        ) : (
          <p className='text-white text-center'>No content to show</p>
        )}
      </PageContainer>
      {isLoading ? <Loading isLoadingMask /> : <></>}
    </>
  );
};

export default AboutUsPage;
