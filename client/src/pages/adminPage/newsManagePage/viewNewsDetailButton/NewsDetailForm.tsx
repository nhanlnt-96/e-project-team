import ImagePreview from 'components/imageUpload/ImagePreview';
import { News } from 'constants/index';
import React from 'react';
import { INewsData } from 'services/news';
import { imageLinkGeneration } from 'utils/imageLinkGeneration';

interface IProps {
  newsData: INewsData;
}

const NewsDetailForm: React.FC<IProps> = ({ newsData }) => {
  return (
    <div className='w-full space-y-6'>
      <div className='w-full flex justify-between space-x-2'>
        <p className='text-gray-500 shrink-0'>News Id</p>
        <p className='text-right'>{newsData.newsId}</p>
      </div>
      <div className='w-full flex justify-between space-x-2'>
        <p className='text-gray-500 shrink-0'>News Title</p>
        <p className='text-right'>{newsData.newsTitle}</p>
      </div>
      <div className='w-full flex justify-between space-x-2'>
        <p className='text-gray-500 shrink-0'>News Type</p>
        <p className='text-right'>{newsData.isAboutUsNews === News.IS_ABOUT_US_NEWS ? 'About Us' : 'News'}</p>
      </div>
      <div className='w-full flex justify-between space-x-2'>
        <p className='text-gray-500 shrink-0'>Created At</p>
        <p className='text-right'>{newsData.createdAt}</p>
      </div>
      <div className='w-full flex flex-col space-y-2'>
        <p className='text-gray-500 shrink-0'>News Cover Image Uploaded</p>
        <ImagePreview uri={imageLinkGeneration(newsData.newsCoverImg, '')} />
      </div>
      <div className='w-full flex flex-col space-y-2'>
        <p className='text-gray-500 shrink-0'>News Body</p>
        <div dangerouslySetInnerHTML={{ __html: newsData.newsBody }} />
      </div>
    </div>
  );
};

export default NewsDetailForm;
