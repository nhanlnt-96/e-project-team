import ImageResponsive from 'components/imageResponsive';
import Loading from 'components/loading';
import NewsSwiper from 'components/newsSwiper';
import PageContainer from 'components/pageContainer';
import Title from 'components/title';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { generateNewsDataObject, getNewsByIdService, INewsData } from 'services/news';
import { imageLinkGeneration } from 'utils/imageLinkGeneration';

const NewsDetailPage = () => {
  const { newsId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newsData, setNewsData] = useState<INewsData | null>(null);

  useEffect(() => {
    if (newsId) {
      (async () => {
        const response = await getNewsByIdService(Number.parseInt(newsId));
        if (response) {
          setNewsData(generateNewsDataObject(response));

          setIsLoading(false);
        }
      })();
    }
  }, [newsId]);

  return (
    <>
      <PageContainer>
        {newsData ? (
          <div className='w-full max-w-3xl mx-auto space-y-4 mb-5 sm:mb-6 lg:mb-9'>
            <Title variant='h1' title={newsData.newsTitle} titleClassName='!font-jost not-italic font-medium' />
            <ImageResponsive
              width={804}
              height={503}
              imageProps={{
                src: imageLinkGeneration(newsData.newsCoverImg, ''),
                alt: newsData.newsTitle
              }}
            />
            <div className='font-playfair-display text-center text-white' dangerouslySetInnerHTML={{ __html: newsData.newsBody }}></div>
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

export default NewsDetailPage;
