import FindATeaBanner from 'assets/images/find-a-tea-banner.jpeg';
import ImageResponsive from 'components/imageResponsive';
import PageContainer from 'components/pageContainer';
import SEO from 'components/seo';
import Title from 'components/title';
import { useGetCurrentUrl } from 'hooks/useGetCurrentUrl';
import CategoryListing from 'pages/clientPage/findATeaPage/CategoryListing';
import React from 'react';

const FindATeaPage = () => {
  const pageUrl = useGetCurrentUrl();

  return (
    <>
      <SEO title='TWG Tea | Find A Tea' description='Find the perfect tea blend.' url={pageUrl} />
      <PageContainer pageContainerClassName='space-y-4 max-w-screen-xl mx-auto md:space-y-6'>
        <div className='w-full'>
          <ImageResponsive width={1220} height={434} imageProps={{ src: FindATeaBanner, alt: 'twg tea find a tea' }} />
        </div>
        <Title title='Find a tea' subtitle='Find the perfect tea blend.' />
        <CategoryListing />
      </PageContainer>
    </>
  );
};

export default FindATeaPage;
