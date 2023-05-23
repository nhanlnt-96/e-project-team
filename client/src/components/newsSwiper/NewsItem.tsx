import React from 'react';
import { INewsData } from 'services/news';

interface IProps {
  newsData: INewsData;
}

const NewsItem: React.FC<IProps> = ({ newsData }) => {
  return <div className='text-white'></div>;
};

export default NewsItem;
