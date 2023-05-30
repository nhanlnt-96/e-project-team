import ImageResponsive from 'components/imageResponsive';
import Loading from 'components/loading';
import NewsSwiper from 'components/newsSwiper';
import PageContainer from 'components/pageContainer';
import Title from 'components/title';
import { useEffectOnce } from 'hooks/useEffectOnce';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAllNewsThunk } from 'redux/newsManage/getAllNewsSlice';
import { getAllNewsSelector } from 'redux/newsManage/selector';
import { imageLinkGeneration } from 'utils/imageLinkGeneration';

const NewsListingPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, newsData } = useAppSelector(getAllNewsSelector);

  useEffectOnce(() => {
    if (!newsData.length) dispatch(getAllNewsThunk());
  });

  return (
    <>
      <PageContainer>
        {newsData.length ? (
          <div className='w-full max-w-3xl mx-auto space-y-4 mb-5 sm:mb-6 lg:mb-9'>
            <Title variant='h1' title={newsData[0].newsTitle} titleClassName='!font-jost not-italic font-medium' />
            <ImageResponsive
              width={804}
              height={503}
              imageProps={{
                src: imageLinkGeneration(newsData[0].newsCoverImg, ''),
                alt: newsData[0].newsTitle
              }}
            />
            <div className='font-playfair-display text-center text-white' dangerouslySetInnerHTML={{ __html: newsData[0].newsBody }}></div>
          </div>
        ) : (
          <p className='text-white text-center text-xl py-6'>News not found</p>
        )}
        <NewsSwiper />
      </PageContainer>
      {isLoading ? <Loading /> : <></>}
    </>
  );
};

export default NewsListingPage;
