import React from 'react';
import { INewsData } from 'services/news';

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
        <p className='text-gray-500 shrink-0'>Net Title</p>
        <p className='text-right'>{newsData.newsTitle}</p>
      </div>
      <div className='w-full flex justify-between space-x-2'>
        <p className='text-gray-500 shrink-0'>Created At</p>
        <p className='text-right'>{newsData.createdAt}</p>
      </div>
      <div className='w-full flex flex-col space-y-2'>
        <p className='text-gray-500 shrink-0'>News Body</p>
        <div dangerouslySetInnerHTML={{ __html: newsData.newsBody }} />
      </div>
    </div>
  );
};

export default NewsDetailForm;
