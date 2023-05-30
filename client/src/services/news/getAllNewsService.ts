import { NEWS_ENDPOINT } from 'services/news/configs';
import { INewsData } from 'services/news/types';
import { axiosInstance } from 'services/utils';

const getAllNewsService = async (): Promise<any> => await axiosInstance.get(`${NEWS_ENDPOINT}/get-all-news`);

export default getAllNewsService;
