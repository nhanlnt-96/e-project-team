import { NEWS_ENDPOINT } from 'services/news/configs';
import { axiosInstance } from 'services/utils';

const getNewsByIdService = async (newsId: number) => await axiosInstance.get(`${NEWS_ENDPOINT}/get-news/${newsId}`);

export default getNewsByIdService;
