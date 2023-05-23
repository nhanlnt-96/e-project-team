import _ from 'lodash';
import { INewsData } from 'services/news/types';
import { convertDate } from 'utils/convertDate';

export const generateNewsDataObject = (news: any): INewsData => ({
  newsId: _.get(news, 'id', 0),
  newsBody: _.get(news, 'newsBody', ''),
  newsTitle: _.get(news, 'newsTitle', ''),
  createdAt: news.createdAt ? convertDate(news.createdAt) : ''
});
