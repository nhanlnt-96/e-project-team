import './AboutUsPage.scss';

import Loading from 'components/loading';
import PageContainer from 'components/pageContainer';
import SEO from 'components/seo';
import { useEffectOnce } from 'hooks/useEffectOnce';
import { useGetCurrentUrl } from 'hooks/useGetCurrentUrl';
import AboutUsItem from 'pages/clientPage/aboutUsPage/AboutUsItem';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAllNewsThunk } from 'redux/newsManage/getAllNewsSlice';
import { getAllNewsSelector } from 'redux/newsManage/selector';

const AboutUsPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, aboutUsData } = useAppSelector(getAllNewsSelector);
  const pageUrl = useGetCurrentUrl();

  useEffectOnce(() => {
    if (!aboutUsData.length) dispatch(getAllNewsThunk());
  });

  return (
    <>
      <SEO title='TWG Tea | About Us' url={pageUrl} />
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
