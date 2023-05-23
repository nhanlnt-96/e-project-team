import { NEWS_ENDPOINT } from 'services/news/configs';
import { ICreateNews } from 'services/news/types';
import { axiosInstance } from 'services/utils';

const createNewsService = async (newsData: ICreateNews) =>
  await axiosInstance.post(`${NEWS_ENDPOINT}/create`, {
    newsTitle: newsData.newsTitle,
    newsBody: newsData.newsBody
  });

export default createNewsService;
