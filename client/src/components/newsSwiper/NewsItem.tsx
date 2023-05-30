import ImageResponsive from 'components/imageResponsive';
import { RouteBasePath } from 'constants/index';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { INewsData } from 'services/news';
import { imageLinkGeneration } from 'utils/imageLinkGeneration';

interface IProps {
  newsData: INewsData;
}

const NewsItem: React.FC<IProps> = ({ newsData }) => {
  const navigate = useNavigate();

  const handleOpenNewsDetail = useCallback(() => {
    navigate(`${RouteBasePath.CLIENT_NEWS_PAGE_BASE_PATH}/${RouteBasePath.CLIENT_NEWS_DETAIL_PAGE_BASE_PATH}/${newsData.newsId}`);
  }, [newsData]);

  return (
    <div className='w-full cursor-pointer space-y-4' onClick={handleOpenNewsDetail}>
      <ImageResponsive
        width={400}
        height={250}
        imageProps={{
          src: imageLinkGeneration(newsData.newsCoverImg, ''),
          alt: newsData.newsTitle
        }}
      />
      <p className='uppercase text-white text-center text-lg font-medium truncate md:text-xl xl:text-2xl'>{newsData.newsTitle}</p>
    </div>
  );
};

export default NewsItem;
