import { NEWS_ENDPOINT } from 'services/news/configs';
import { ICreateNews } from 'services/news/types';
import { axiosInstance } from 'services/utils';

const createNewsService = async (newsDataInput: ICreateNews) => {
  const formData = new FormData();

  const newsData = {
    newsTitle: newsDataInput.newsTitle,
    newsBody: newsDataInput.newsBody,
    isAboutUsNews: newsDataInput.isAboutUsNews
  };

  formData.append('newsCoverImgFile', newsDataInput.newsCoverImgFile);

  formData.append('newsData', JSON.stringify(newsData));

  return await axiosInstance.post(`${NEWS_ENDPOINT}/create`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};

export default createNewsService;
