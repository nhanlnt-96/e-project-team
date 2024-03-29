import _ from 'lodash';
import { INewsData } from 'services/news/types';
import { convertDate } from 'utils/convertDate';

export const generateNewsDataObject = (news: any): INewsData => ({
  newsId: _.get(news, 'id', 0),
  newsBody: _.get(news, 'newsBody', ''),
  newsTitle: _.get(news, 'newsTitle', ''),
  newsCoverImg: _.get(news, 'newsCoverImg', ''),
  isAboutUsNews: _.get(news, 'isAboutUsNews', ''),
  createdAt: news.createdAt ? convertDate(news.createdAt) : ''
});
