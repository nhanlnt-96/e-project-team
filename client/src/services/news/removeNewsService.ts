import { NEWS_ENDPOINT } from 'services/news/configs';
import { axiosInstance } from 'services/utils';

const removeNewsService = async (newsId: number) => await axiosInstance.delete(`${NEWS_ENDPOINT}/remove-news/${newsId}`);

export default removeNewsService;
