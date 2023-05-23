import { NEWS_ENDPOINT } from 'services/news/configs';
import { IUpdateNews } from 'services/news/types';
import { axiosInstance } from 'services/utils';

const updateNewsService = async (newsUpdateData: IUpdateNews) => await axiosInstance.put(`${NEWS_ENDPOINT}/update`, newsUpdateData);

export default updateNewsService;
